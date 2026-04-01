"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import logoImage from "@/app/FBFLogo.png";
import wordmarkImage from "@/app/WordMark/WordMark.svg";

import styles from "@/app/home/page.module.css";

type NavItem = {
  label: string;
  href: string;
};

type LandingTopbarProps = {
  items: readonly NavItem[];
  profileLabel?: string;
};

export function LandingTopbar({
  items,
  profileLabel = "Shubh",
}: LandingTopbarProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className={styles.topbar}>
      <div
        className={`${styles.topbarShell} ${isNavOpen ? styles.topbarShellExpanded : ""}`}
      >
        <div className={styles.topbarInner}>
          <Link aria-label="Go to homepage" className={styles.brand} href="/">
            <Image
              alt="Framer Form Builder"
              className={styles.brandMark}
              priority
              src={logoImage}
            />
            <Image
              alt="Framer Form Builder wordmark"
              className={styles.brandWordmark}
              priority
              src={wordmarkImage}
            />
          </Link>
          <NavigationMenu className={styles.topbarNav}>
            <NavigationMenuList className={styles.topbarNavList}>
              {items.map((item) => (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuLink asChild>
                    <Link
                      className={`${styles.topbarNavLink} ${pathname === item.href ? styles.topbarNavLinkActive : ""}`}
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className={styles.topbarActions}>
            <span className={styles.profileName}>{profileLabel}</span>
            <Button
              asChild
              className="landing-primary-button"
              size="sm"
              variant="default"
            >
              <Link href="/builder">Open Builder</Link>
            </Button>
          </div>
          <Button
            aria-expanded={isNavOpen}
            aria-label="Toggle navigation"
            className={`${styles.topbarMenuButton} ${isNavOpen ? styles.topbarMenuButtonOpen : ""}`}
            onClick={() => setIsNavOpen((current) => !current)}
            size="icon-sm"
            type="button"
            variant="ghost"
          >
            <span />
            <span />
          </Button>
        </div>
        <div
          className={`${styles.mobileNavPanel} ${isNavOpen ? styles.mobileNavPanelOpen : ""}`}
        >
          {items.map((item, index) => (
            <Link
              className={`${styles.mobileNavLink} ${styles.mobileNavEntry} ${pathname === item.href ? styles.mobileNavLinkActive : ""}`}
              href={item.href}
              key={item.label}
              onClick={() => setIsNavOpen(false)}
              style={{ "--nav-item-index": index } as CSSProperties}
            >
              {item.label}
            </Link>
          ))}
          <Button
            asChild
            className={`landing-primary-button ${styles.mobileBuilderButton} ${styles.mobileNavEntry}`}
            size="sm"
            style={{ "--nav-item-index": items.length } as CSSProperties}
            variant="default"
          >
            <Link href="/builder" onClick={() => setIsNavOpen(false)}>
              Open Builder
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
