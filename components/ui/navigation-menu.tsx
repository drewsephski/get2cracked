import * as React from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { ArrowRightIcon, ChevronDownIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

type NavItemType = {
	title: string;
	href: string;
	description?: string;
	icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

function NavigationMenu({
	className,
	children,
	viewport = true,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
	viewport?: boolean;
}) {
	return (
		<NavigationMenuPrimitive.Root
			data-slot="navigation-menu"
			data-viewport={viewport}
			className={cn(
				'group/navigation-menu flex max-w-max flex-1 items-center justify-center',
				className,
			)}
			{...props}
		>
			{children}
			{viewport && <NavigationMenuViewport />}
		</NavigationMenuPrimitive.Root>
	);
}

function NavigationMenuList({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
	return (
		<NavigationMenuPrimitive.List
			data-slot="navigation-menu-list"
			className={cn(
				'group flex flex-1 list-none items-center justify-center gap-1',
				className,
			)}
			{...props}
		/>
	);
}

function NavigationMenuItem({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
	return (
		<NavigationMenuPrimitive.Item
			data-slot="navigation-menu-item"
			className={cn('relative', className)}
			{...props}
		/>
	);
}

function NavigationMenuTrigger({
	className,
	children,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
	return (
		<NavigationMenuPrimitive.Trigger
			data-slot="navigation-menu-trigger"
			className={cn(
				'group inline-flex w-max items-center justify-center rounded-md px-4 py-1 text-sm font-medium outline-none transition-[color,box-shadow] hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:outline-1 focus-visible:ring focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/50 data-[state=open]:text-accent-foreground data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent',
				className,
			)}
			{...props}
		>
			{children}{' '}
			<ChevronDownIcon
				className="relative top-px ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
				aria-hidden="true"
			/>
		</NavigationMenuPrimitive.Trigger>
	);
}

function NavigationMenuContent({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
	return (
		<NavigationMenuPrimitive.Content
			data-slot="navigation-menu-content"
			className={cn(
				'left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto',
				'**:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:bg-background/80 group-data-[viewport=false]/navigation-menu:text-foreground group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-300 group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95',
				className,
			)}
			{...props}
		/>
	);
}

function NavigationMenuViewport({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
	return (
		<div className="absolute left-0 top-full isolate z-50 flex justify-center">
			<NavigationMenuPrimitive.Viewport
				data-slot="navigation-menu-viewport"
				className={cn(
					'origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-background/95 text-popover-foreground shadow backdrop-blur-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 supports-[backdrop-filter]:bg-background/60 md:w-[var(--radix-navigation-menu-viewport-width)]',
					className,
				)}
				{...props}
			/>
		</div>
	);
}

function NavigationMenuLink({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
	return (
		<NavigationMenuPrimitive.Link
			data-slot="navigation-menu-link"
			className={cn(
				"flex flex-col justify-center gap-1 rounded-sm px-4 py-1 text-sm outline-none transition-all hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:outline-1 focus-visible:ring focus-visible:ring-ring/50 data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground data-[active=true]:hover:bg-accent data-[active=true]:focus:bg-accent [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function NavigationMenuIndicator({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
	return (
		<NavigationMenuPrimitive.Indicator
			data-slot="navigation-menu-indicator"
			className={cn(
				'top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in',
				className,
			)}
			{...props}
		>
			<div className="relative top-[60%] size-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
		</NavigationMenuPrimitive.Indicator>
	);
}

function NavGridCard({
	link,
	...props
}: React.ComponentProps<'div'> & {
	link: NavItemType;
}) {
	return (
		<NavigationMenuPrimitive.Link asChild>
			<div {...props}>
				{link.icon && (
					<link.icon className="relative size-5 text-foreground/80" />
				)}
				<div className="relative">
					<span className="text-sm font-medium text-foreground/80">
						{link.title}
					</span>
					{link.description && (
						<p className="mt-2 text-xs text-muted-foreground">
							{link.description}
						</p>
					)}
				</div>
			</div>
		</NavigationMenuPrimitive.Link>
	);
}

function NavSmallItem({
	item,
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuLink> & {
	item: Omit<NavItemType, 'description'>;
}) {
	return (
		<NavigationMenuLink
			className={cn(
				'group relative h-max flex-row items-center gap-x-3 p-2',
				className,
			)}
			{...props}
		>
			{item.icon && <item.icon />}
			<p className="text-sm">{item.title}</p>
			<div className="relative ml-auto flex h-full w-4 items-center">
				<ArrowRightIcon className="size-4 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
			</div>
		</NavigationMenuLink>
	);
}

function NavLargeItem({
	link,
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuLink> & {
	link: NavItemType;
}) {
	return (
		<NavigationMenuLink
			className={cn(
				'group relative flex flex-col justify-center border bg-background p-0',
				className,
			)}
			{...props}
		>
			<div className="flex items-center justify-between px-5 py-4">
				<div className="space-y-1">
					<span className="text-sm font-medium leading-none">{link.title}</span>
					{link.description && (
						<p className="line-clamp-1 text-xs text-muted-foreground">
							{link.description}
						</p>
					)}
				</div>
				{link.icon && <link.icon className="size-6 text-muted-foreground" />}
			</div>
		</NavigationMenuLink>
	);
}

function NavItemMobile({
	item,
	className,
	...props
}: React.ComponentProps<'a'> & {
	item: NavItemType;
}) {
	return (
		<a
			className={cn(
				"group relative flex gap-1 gap-x-2 rounded-sm p-2 text-sm outline-none transition-all hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:outline-1 focus-visible:ring focus-visible:ring-ring/50 data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground data-[active=true]:hover:bg-accent data-[active=true]:focus:bg-accent [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
				className,
			)}
			{...props}
		>
			<div
				className={cn(
					'flex size-10 items-center justify-center rounded-lg border bg-muted/20',
				)}
			>
				{item.icon && <item.icon />}
			</div>
			<div className={cn('flex h-10 flex-col justify-center')}>
				<p className="text-sm">{item.title}</p>
				<span className="line-clamp-1 text-xs leading-snug text-muted-foreground">
					{item.description}
				</span>
			</div>
		</a>
	);
}

export {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuContent,
	NavigationMenuTrigger,
	NavigationMenuLink,
	NavigationMenuIndicator,
	NavigationMenuViewport,
	NavGridCard,
	NavSmallItem,
	NavLargeItem,
	NavItemMobile,
	type NavItemType,
};
