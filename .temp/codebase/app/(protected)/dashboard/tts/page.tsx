// app/tts/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Volume2, Mic, Info as InfoIcon, Sparkles, AlertCircle, CheckCircle2, Loader2, Info, Trash2, Copy, Play, StopCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CreditBadge } from "@/components/ui/credit-badge";
import { useUserCredits } from "@/hooks/use-user-credits";
import { toast } from "sonner";

type VoiceRow = {
  id: string;
  name: string;
  provider: string;
  generationId?: string | null;
  description?: string | null;
  createdAt?: string;
};

export default function TtsPage() {
  // TTS form state
  const [text, setText] = useState("Dogs became domesticated between 23,000 and 30,000 years ago.");
  const [acting, setActing] = useState("");
  const [format, setFormat] = useState<"wav" | "pcm">("wav");
  const [instantMode, setInstantMode] = useState(false);
  const [continueGenId, setContinueGenId] = useState("");

  // Voice state
  const [voices, setVoices] = useState<VoiceRow[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<{ id: string, name: string, provider: string } | null>(null);
  const [isLoadingVoices, setIsLoadingVoices] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [previewText, setPreviewText] = useState("Hello, this is a preview of my voice.");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Stream + log state
  const [log, setLog] = useState<string[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // AI state
  const [aiInput, setAiInput] = useState("");
  const [aiOutput, setAiOutput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  // Audio scheduling
  const audioCtxRef = useRef<AudioContext | null>(null);
  const cursorTimeRef = useRef<number>(0);

  // Credit state
  const { credits, isPaid, loading: creditsLoading } = useUserCredits();

  // Setup WebAudio
  useEffect(() => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioCtxRef.current = ctx;
    cursorTimeRef.current = ctx.currentTime;
    audioRef.current = new Audio();

    return () => {
      ctx.close();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Load voices from Hume API
  useEffect(() => {
    const fetchVoices = async () => {
      setIsLoadingVoices(true);
      setVoiceError(null);
      try {
        console.log('Fetching voices from Hume API...');
        // Fetch Hume AI preset voices by default
        const res = await fetch('/api/hume/voices?provider=HUME_AI&page_size=50');

        if (!res.ok) {
          const error = await res.json().catch(() => ({}));
          console.error('Error response from API:', error);
          throw new Error(error.error || `Failed to fetch voices: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        console.log('API Response:', data);

        // The response should have a voices_page array
        const voicesList = Array.isArray(data.voices_page) ? data.voices_page : [];
        console.log('Voices list:', voicesList);

        setVoices(voicesList);

        // Auto-select the first voice if none selected
        if (voicesList.length > 0 && !selectedVoice) {
          const firstVoice = voicesList[0];
          console.log('Auto-selecting first voice:', firstVoice);
          setSelectedVoice({
            id: firstVoice.id,
            name: firstVoice.name || `Voice ${firstVoice.id}`,
            provider: firstVoice.provider ? firstVoice.provider.toLowerCase() : 'hume_ai'
          });
        }
      } catch (err) {
        console.error('Error fetching voices:', err);
        setVoiceError(err instanceof Error ? err.message : 'Failed to load voices. Please try again later.');
      } finally {
        setIsLoadingVoices(false);
      }
    };

    fetchVoices();
  }, [selectedVoice]);

  const appendLog = (s: string) => setLog((prev) => [...prev, s]);

  const stopStream = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
    appendLog("Stream stopped by user");
  };

  async function handleStream() {
    // Check if user has credits (only for free users)
    if (!isPaid && credits <= 0) {
      toast.error('You have no credits remaining. Please upgrade your plan to continue using text-to-speech.');
      return;
    }

    if (!audioCtxRef.current) return;

    // Stop any existing stream
    if (isStreaming && abortControllerRef.current) {
      stopStream();
    }

    // Create a new abort controller for this stream
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsStreaming(true);
    setLog([]);
    appendLog("Starting stream...");

    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          text,
          description: acting || undefined,
          voice: { name: selectedVoice?.name, provider: selectedVoice?.provider },
          continueGenerationId: continueGenId || undefined,
          format,
          instantMode,
        }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const err = await safeJson(res);

        if (res.status === 402) {
          toast.error('Insufficient credits to use text-to-speech. Please upgrade your plan.');
          appendLog(`Credit error: ${err?.error || res.statusText}`);
        } else {
          toast.error('Failed to generate speech. Please try again.');
          appendLog(`Stream failed: ${err?.error || res.statusText}`);
        }

        setIsStreaming(false);
        return;
      }

      if (audioCtxRef.current.state === "suspended") {
        await audioCtxRef.current.resume();
      }
      cursorTimeRef.current = audioCtxRef.current.currentTime;

      const reader = res.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Directly play the WAV chunk
        playWavChunk(audioCtxRef.current!, value);
      }
      appendLog("Stream ended.");
    } catch (e: any) {
      if (e.name === 'AbortError') {
        appendLog("Stream aborted by user");
      } else {
        appendLog("Exception: " + String(e));
      }
    } finally {
      setIsStreaming(false);
    }
  }

  async function handleCreateVoiceDemo() {
    setLog([]);
    appendLog("Creating voice demo...");
    try {
      const res = await fetch("/api/tts/create-voice", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          description:
            "Crisp, upper-class British accent with impeccably articulated consonants and perfectly placed vowels. Authoritative and theatrical, as if giving a lecture.",
          sampleText:
            "The science of speech. That's my profession; also my hobby. Happy is the man who can make a living by his hobby!",
          sampleIndex: 1,
          voiceNamePrefix: "higgins",
          notes: "Demo created via TTS page",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        appendLog("Create failed: " + (data.error || "Unknown error"));
        return;
      }
      setSelectedVoice(data.voice);
      setContinueGenId(data.generationId);
      appendLog(`Voice created: ${data.voiceName}`);

      // Refresh voices list
      const vres = await fetch("/api/voices");
      if (vres.ok) {
        const vdata = await vres.json();
        setVoices(vdata.voices || []);
      }
    } catch (e: any) {
      appendLog("Exception: " + String(e));
    }
  }

  async function handleAskAI() {
    // Check if user has credits (only for free users)
    if (!isPaid && credits <= 0) {
      toast.error('You have no credits remaining. Please upgrade your plan to continue using AI chat.');
      return;
    }

    setAiLoading(true);
    setAiOutput("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: "You are a helpful assistant. Write concise, vivid copy suitable for expressive TTS." },
            { role: "user", content: aiInput || "Write an inspiring 2-sentence narration about human curiosity." },
          ],
        }),
      });

      if (!res.ok || !res.body) {
        const err = await safeJson(res);

        if (res.status === 402) {
          toast.error('Insufficient credits to use AI chat. Please upgrade your plan.');
          setAiOutput("Credit error: " + (err?.error || res.statusText));
        } else {
          toast.error('Failed to generate AI response. Please try again.');
          setAiOutput("AI error: " + (err?.error || res.statusText));
        }

        setAiLoading(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let textAcc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textAcc += decoder.decode(value);
        setAiOutput(textAcc);
      }
    } catch (e: any) {
      setAiOutput(String(e));
    } finally {
      setAiLoading(false);
    }
  }

  function safeJson(res: Response): Promise<any | null> {
    return res
      .clone()
      .json()
      .catch(() => null);
  }

  function base64ToBytes(b64: string) {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
  }

  // Decode WAV chunk and schedule
  function playWavChunk(ctx: AudioContext, bytes: Uint8Array) {
    // Create a new ArrayBuffer from the Uint8Array to ensure it's not a SharedArrayBuffer
    const buffer = bytes.buffer.slice(
      bytes.byteOffset,
      bytes.byteOffset + bytes.byteLength
    );

    ctx.decodeAudioData(buffer as ArrayBuffer)
      .then((audioBuffer) => {
        const src = ctx.createBufferSource();
        src.buffer = audioBuffer;
        src.connect(ctx.destination);
        const startAt = Math.max(cursorTimeRef.current, ctx.currentTime + 0.02);
        src.start(startAt);
        cursorTimeRef.current = startAt + audioBuffer.duration;
      })
      .catch((err) => appendLog("Decode error: " + String(err)));
  }

  // Play raw PCM (16-bit mono, 16kHz assumed)
  function playPcmChunk(ctx: AudioContext, pcmBytes: Uint8Array, sampleRate = 16000) {
    const samples = pcmBytes.length / 2;
    const floats = new Float32Array(samples);
    for (let i = 0; i < samples; i++) {
      const lo = pcmBytes[i * 2];
      const hi = pcmBytes[i * 2 + 1];
      const val = (hi << 8) | lo;
      const signed = (val & 0x8000) ? val - 0x10000 : val;
      floats[i] = signed / 32768;
    }
    const buffer = ctx.createBuffer(1, samples, sampleRate);
    buffer.copyToChannel(floats, 0, 0);
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.connect(ctx.destination);
    const startAt = Math.max(cursorTimeRef.current, ctx.currentTime + 0.02);
    src.start(startAt);
    cursorTimeRef.current = startAt + buffer.duration;
  }

  async function handleVoiceSelect(v: VoiceRow) {
    setSelectedVoice(v);
    if (v.generationId) setContinueGenId(v.generationId);
  }

  async function playVoicePreview() {
    if (!selectedVoice || !previewText.trim()) return;

    setIsPlayingPreview(true);
    setVoiceError(null);

    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: previewText,
          voice: {
            name: selectedVoice.name,
            provider: selectedVoice.provider || 'HUME_AI'
          }
        })
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to generate preview');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);
      audio.onended = () => {
        setIsPlayingPreview(false);
        URL.revokeObjectURL(audioUrl);
      };
      audio.onerror = () => {
        setIsPlayingPreview(false);
        setVoiceError('Failed to play audio preview');
        URL.revokeObjectURL(audioUrl);
      };

      audioRef.current = audio;
      await audio.play();
    } catch (error) {
      console.error("Error playing preview:", error);
      setVoiceError(error instanceof Error ? error.message : 'Failed to play preview');
      setIsPlayingPreview(false);
    }
  }

  function speakAIOutput() {
    if (!aiOutput.trim()) return;
    setText(aiOutput.trim());
    handleStream();
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-3xl font-bold text-transparent">
              AI Text to Speech
            </h1>
            <p className="text-muted-foreground">
              Transform text into natural-sounding speech with our advanced AI voices. Perfect for content creators, developers, and anyone who needs high-quality voice synthesis.
            </p>
          </div>
          {!creditsLoading && (
            <CreditBadge credits={credits} isPaid={isPaid} />
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main TTS Input Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Volume2 className="size-5 text-primary" />
                    Text to Speech
                  </CardTitle>
                  <CardDescription>
                    Enter your text and customize the voice settings
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="instant-mode">Instant Mode</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="size-4 text-muted-foreground transition-colors hover:text-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Instant mode provides faster results with slightly lower quality</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Switch
                    id="instant-mode"
                    checked={instantMode}
                    onCheckedChange={setInstantMode}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 px-6 pb-6 pt-4">
              <h2 className="text-lg font-medium">Synthesis</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="text" className="mb-2 block">Text to speak</Label>
                  <Textarea
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text to convert to speech..."
                    className="min-h-[100px] w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="acting">Voice Style</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <InfoIcon className="size-3.5 text-muted-foreground transition-colors hover:text-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Add emotion or style (e.g., cheerful, serious, excited)</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="acting"
                    value={acting}
                    onChange={(e) => setActing(e.target.value)}
                    placeholder="e.g. cheerful, serious, excited"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="format">Output Format</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="size-3.5 text-muted-foreground hover:text-foreground" />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-[250px]">
                        <p>WAV: Higher quality, larger file size. PCM: Faster streaming, lower quality.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Select
                    value={format}
                    onValueChange={(value: "wav" | "pcm") => setFormat(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wav">WAV (High Quality)</SelectItem>
                      <SelectItem value="pcm">PCM (Faster Streaming)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                <Button
                  onClick={handleStream}
                  disabled={isStreaming || !text.trim()}
                  className="flex-1 sm:w-auto sm:flex-none"
                >
                  {isStreaming ? (
                    <>
                      <svg className="-ml-1 mr-2 size-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Volume2 className="mr-2 size-4" />
                      Generate Speech
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={stopStream}
                  disabled={!isStreaming}
                  className="flex-1 sm:w-auto sm:flex-none"
                >
                  Stop Generation
                </Button>
              </div>

              <div className="pt-2">
                <Label className="mb-2 block">Log</Label>
                <div className="h-40 overflow-auto rounded-md border border-neutral-200 bg-muted/50 p-3 text-xs dark:border-neutral-800 dark:bg-neutral-900">
                  {log.map((l, i) => (
                    <div key={i} className="text-gray-300">
                      {l}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>

          </Card>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Voice Selection Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Mic className="size-5 text-primary" />
                      Available Voices
                    </CardTitle>
                    <CardDescription>
                      Select a voice for your text-to-speech
                    </CardDescription>
                  </div>
                  {isLoadingVoices && (
                    <Loader2 className="size-4 animate-spin text-muted-foreground" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select
                  value={selectedVoice?.id || ""}
                  onValueChange={(value) => {
                    const voice = voices.find(v => v.id === value);
                    if (voice) handleVoiceSelect(voice);
                  }}
                  disabled={isLoadingVoices || voices.length === 0}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={
                      isLoadingVoices ? "Loading voices..." : "Select a voice"
                    } />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {voices.map((voice) => (
                      <SelectItem key={voice.id} value={voice.id}>
                        <div className="flex items-center gap-2">
                          <span className="truncate">{voice.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {voice.provider}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedVoice && (
                  <div className="space-y-4 rounded-lg border p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{selectedVoice.name}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            {selectedVoice.provider}
                          </span>
                        </div>
                      </div>
                      {selectedVoice && (
                        <p className="text-sm text-muted-foreground">
                          {selectedVoice.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2 pt-2">
                      <Label htmlFor="preview-text">Preview Text</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="preview-text"
                          value={previewText}
                          onChange={(e) => setPreviewText(e.target.value)}
                          placeholder="Enter text to preview..."
                          className="flex-1"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={playVoicePreview}
                          disabled={isPlayingPreview || !previewText.trim()}
                        >
                          {isPlayingPreview ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : (
                            <Play className="size-4" />
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Click the play button to hear a preview of this voice
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI Assistant Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="size-5 text-primary" />
                  AI Text Assistant
                </CardTitle>
                <CardDescription>
                  Generate text for your speech using AI
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ai-input">Describe what you want to say</Label>
                  <Textarea
                    id="ai-input"
                    rows={3}
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="E.g., 'A professional introduction for a tech conference'"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button
                    onClick={handleAskAI}
                    disabled={aiLoading || !aiInput.trim()}
                    className="flex-1"
                  >
                    {aiLoading ? 'Generating...' : 'Generate Text'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={speakAIOutput}
                    disabled={!aiOutput.trim()}
                    className="flex-1"
                  >
                    <Volume2 className="mr-2 size-4" />
                    Speak Output
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>AI Generated Text</Label>
                    {aiOutput && (
                      <button
                        onClick={() => {
                          setText(aiOutput);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-xs text-primary hover:underline"
                      >
                        Use in TTS
                      </button>
                    )}
                  </div>
                  <div className={`min-h-[100px] rounded-md border p-3 text-sm ${aiOutput ? 'bg-background' : 'bg-muted/30'
                    }`}>
                    {aiOutput || (
                      <p className="text-muted-foreground">
                        AI generated text will appear here. Try asking for a speech about your favorite topic.
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Log Output */}
        {log.length > 0 && (
          <Card>
            <CardHeader className="border-b px-4 py-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                  <Sparkles className="size-5 text-primary" />
                  <span>Generation Log</span>
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
                    <span className="sr-only">Clear Log</span>
                    <Trash2 className="size-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
                    <span className="sr-only">Copy Log</span>
                    <Copy className="size-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-80 overflow-y-auto rounded-md bg-muted/30 font-mono text-sm">
                {log.map((line, i) => {
                  const isError = line.toLowerCase().includes('error');
                  const isSuccess = line.toLowerCase().includes('success');
                  const isProcessing = line.toLowerCase().includes('processing');

                  return (
                    <div
                      key={i}
                      className={`group flex items-start gap-3 border-b border-muted/50 p-3 transition-colors hover:bg-muted/10 ${isError ? 'bg-destructive/5 hover:bg-destructive/10' : ''
                        }`}
                    >
                      <div className="shrink-0 pt-0.5">
                        {isError ? (
                          <AlertCircle className="size-4 text-destructive" />
                        ) : isSuccess ? (
                          <CheckCircle2 className="size-4 text-green-500" />
                        ) : isProcessing ? (
                          <Loader2 className="size-4 animate-spin text-primary" />
                        ) : (
                          <Info className="size-4 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between">
                          <span className={`text-sm font-medium ${isError ? 'text-destructive' : 'text-foreground'
                            }`}>
                            {line}
                          </span>
                          <span className="ml-2 text-xs text-muted-foreground">
                            {new Date().toLocaleTimeString()}
                          </span>
                        </div>
                        {isError && (
                          <div className="mt-1 text-xs text-destructive/80">
                            Please check your input and try again
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
                {log.length === 0 && (
                  <div className="flex h-20 items-center justify-center text-muted-foreground">
                    No log entries yet
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <footer className="rounded-lg border bg-muted/30 p-4 text-center text-sm text-muted-foreground">
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
            <span>💡 <strong>Tip:</strong> For best results, keep text under 500 characters.</span>
            <span className="hidden sm:inline">•</span>
            <span>Use WAV format for higher quality audio.</span>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
}
