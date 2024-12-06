import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { ExternalLink, File, ImageIcon, Layout, PanelLeft } from "lucide-react";
import {
  Beaker,
  Users,
  Video,
  DiscIcon as Discord,
  FileText,
  Calendar,
  Zap,
  Terminal,
  Cog,
  Image,
  Headphones,
  Paintbrush,
  Clock,
  Film,
  Globe,
  FileCode,
  Brain,
  FileImage,
  BotIcon as Robot,
} from "lucide-react";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

import { Icons } from "./icons";
import { Separator } from "./ui/separator";

export function MoreProductSheet() {
  // const [sheetOpen, setSheetOpen] = React.useState(false);
  return (
    <Sheet>
      {/* <Sheet open={sheetOpen} onOpenChange={setSheetOpen}> */}
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="w-7 h-7">
          <PanelLeft />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px]">
        {/* <SheetContent side="right" className="w-[400px] p-0"> */}
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-6 p-6">
            <SheetHeader className="space-y-4">
              <SheetTitle className="flex flex-col text-sm">
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col">
                    <span className="text-base font-semibold">Bleverse</span>
                    <span className="text-muted-foreground text-sm">
                      Products
                    </span>
                  </div>
                  <SheetClose className="right-4 top-2 p-1 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
                    <kbd className="inline-flex select-none items-center gap-1 rounded border bg-background px-2 py-1 font-mono font-medium opacity-100">
                      <span className="text-xs">ESC</span>
                      <span className="sr-only">Close</span>
                    </kbd>
                  </SheetClose>
                </div>
              </SheetTitle>
            </SheetHeader>
            <Separator />

            {/* <div className="space-y-4">
              <Link
                href="#"
                className="w-full justify-start gap-2 text-muted-foreground hover:text-primary flex items-center"
              >
                <Beaker className="h-4 w-4" />
                Test your tasks
              </Link>
              <Link
                href="#"
                className="w-full justify-start gap-2 text-muted-foreground hover:text-primary flex items-center"
              >
                <Users className="h-4 w-4" />
                Invite team members
              </Link>
              <Link
                href="#"
                className="w-full justify-start gap-2 text-muted-foreground hover:text-primary flex items-center"
              >
                <Video className="h-4 w-4" />
                Watch a 14 min walkthrough video
              </Link>
              <Link
                href="#"
                className="w-full justify-start gap-2 text-muted-foreground hover:text-primary flex items-center"
              >
                <Discord className="h-4 w-4" />
                Join our Discord for help and support
                <ExternalLink className="ml-auto h-4 w-4" />
              </Link>
            </div> */}

            <div>
              <h3 className="mb-4 text-sm font-semibold">
                ✨ Reliverse Spaces
              </h3>
              <div className="space-y-4">
                {/* <Link
                  href="#"
                  className="w-full justify-start gap-2 text-muted-foreground hover:text-primary flex items-center flex items-center"
                >
                  <FileText className="h-4 w-4" />
                  <span>How to write a task</span>{" "}
                  <ExternalLink className="ml-1 h-4 w-4" />
                </Link> */}
                {
                  <Link href="#" className="sheet-link">
                    <File className="h-4 w-4" />
                    Documentation
                    <ExternalLink className="ml-auto h-4 w-4" />
                  </Link>
                  /* <Link     
                  href="#"
                  className="w-full justify-start gap-2 text-muted-foreground hover:text-primary flex items-center"
                >
                  <Zap className="h-4 w-4" />
                  How to trigger a task
                  <ExternalLink className="ml-auto h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  className="w-full justify-start gap-2 text-muted-foreground hover:text-primary flex items-center"
                >
                  <Terminal className="h-4 w-4" />
                  Running the CLI
                  <ExternalLink className="ml-auto h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  className="w-full justify-start gap-2 text-muted-foreground hover:text-primary flex items-center"
                >
                  <Cog className="h-4 w-4" />
                  How Trigger.dev works
                  <ExternalLink className="ml-auto h-4 w-4" />
                </Link> */
                }
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold">🌌 Bleverse Spaces</h3>
              <div className="space-y-4">
                <Link href="#" className="sheet-link">
                  <Globe className="h-4 w-4" />
                  Discord Server
                  <ExternalLink className="ml-auto h-4 w-4" />
                </Link>
                {/* <Link
                  href="#"
                  className="w-full justify-start gap-2 text-muted-foreground hover:text-primary flex items-center"
                >
                  <Headphones className="h-4 w-4" />
                  Deepgram audio transcription
                  <ExternalLink className="ml-auto h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  className="w-full justify-start gap-2 text-muted-foreground hover:text-primary flex items-center"
                >
                  <Paintbrush className="h-4 w-4" />
                  Fal.ai image to cartoon
                  <ExternalLink className="ml-auto h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  className="w-full justify-start gap-2 text-muted-foreground hover:text-primary flex items-center"
                >
                  <Clock className="h-4 w-4" />
                  Fal.ai with Realtime
                  <ExternalLink className="ml-auto h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  className="w-full justify-start gap-2 text-muted-foreground hover:text-primary flex items-center"
                >
                  <Film className="h-4 w-4" />
                  FFmpeg video processing
                  <ExternalLink className="ml-auto h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  className="w-full justify-start gap-2 text-muted-foreground hover:text-primary flex items-center"
                >
                  <Globe className="h-4 w-4" />
                  Firecrawl URL crawl
                  <ExternalLink className="ml-auto h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  className="w-full justify-start gap-2 text-muted-foreground hover:text-primary flex items-center"
                >
                  <FileCode className="h-4 w-4" />
                  LibreOffice PDF conversion
                  <ExternalLink className="ml-auto h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  className="w-full justify-start gap-2 text-muted-foreground hover:text-primary flex items-center"
                >
                  <Brain className="h-4 w-4" />
                  OpenAI with retrying
                  <ExternalLink className="ml-auto h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  className="w-full justify-start gap-2 text-muted-foreground hover:text-primary flex items-center"
                >
                  <FileImage className="h-4 w-4" />
                  PDF to image
                  <ExternalLink className="ml-auto h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  className="w-full justify-start gap-2 text-muted-foreground hover:text-primary flex items-center"
                >
                  <Robot className="h-4 w-4" />
                  Puppeteer
                  <ExternalLink className="ml-auto h-4 w-4" />
                </Link> */}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold">🧿 Nazar Kornienko</h3>
              <div className="space-y-4">
                <Link href="#" className="sheet-link">
                  <ImageIcon className="h-4 w-4" />
                  Portfolio
                  <ExternalLink className="ml-auto h-4 w-4" />
                </Link>
                <Link href="#" className="sheet-link">
                  <Icons.x className="h-4 w-4" />
                  Twitter
                  <ExternalLink className="ml-auto h-4 w-4" />
                </Link>
                <Link href="#" className="sheet-link">
                  <GitHubLogoIcon className="h-4 w-4" />
                  GitHub
                  <ExternalLink className="ml-auto h-4 w-4" />
                </Link>
                {/* <Link
      href="#"
      className="w-full justify-start gap-2 text-muted-foreground hover:text-primary flex items-center"
    >
      <Headphones className="h-4 w-4" />
      Deepgram audio transcription
      <ExternalLink className="ml-auto h-4 w-4" />
    </Link>
    <Link
      href="#"
      className="w-full justify-start gap-2 text-muted-foreground hover:text-primary flex items-center"
    >
      <Paintbrush className="h-4 w-4" />
      Fal.ai image to cartoon
      <ExternalLink className="ml-auto h-4 w-4" />
    </Link>
    <Link
      href="#"
      className="w-full justify-start gap-2 text-muted-foreground hover:text-primary flex items-center"
    >
      <Clock className="h-4 w-4" />
      Fal.ai with Realtime
      <ExternalLink className="ml-auto h-4 w-4" />
    </Link>
    <Link
      href="#"
      className="w-full justify-start gap-2 text-muted-foreground hover:text-primary flex items-center"
    >
      <Film className="h-4 w-4" />
      FFmpeg video processing
      <ExternalLink className="ml-auto h-4 w-4" />
    </Link>
    <Link
      href="#"
      className="w-full justify-start gap-2 text-muted-foreground hover:text-primary flex items-center"
    >
      <Globe className="h-4 w-4" />
      Firecrawl URL crawl
      <ExternalLink className="ml-auto h-4 w-4" />
    </Link>
    <Link
      href="#"
      className="w-full justify-start gap-2 text-muted-foreground hover:text-primary flex items-center"
    >
      <FileCode className="h-4 w-4" />
      LibreOffice PDF conversion
      <ExternalLink className="ml-auto h-4 w-4" />
    </Link>
    <Link
      href="#"
      className="w-full justify-start gap-2 text-muted-foreground hover:text-primary flex items-center"
    >
      <Brain className="h-4 w-4" />
      OpenAI with retrying
      <ExternalLink className="ml-auto h-4 w-4" />
    </Link>
    <Link
      href="#"
      className="w-full justify-start gap-2 text-muted-foreground hover:text-primary flex items-center"
    >
      <FileImage className="h-4 w-4" />
      PDF to image
      <ExternalLink className="ml-auto h-4 w-4" />
    </Link>
    <Link
      href="#"
      className="w-full justify-start gap-2 text-muted-foreground hover:text-primary flex items-center"
    >
      <Robot className="h-4 w-4" />
      Puppeteer
      <ExternalLink className="ml-auto h-4 w-4" />
    </Link> */}
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
