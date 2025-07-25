"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function GuideDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Guide</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-muted-foreground">This is the guide content.</div>
      </DialogContent>
    </Dialog>
  );
}
