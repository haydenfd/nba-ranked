"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function StatsDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Stats</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-muted-foreground">This is the stats modal.</div>
      </DialogContent>
    </Dialog>
  );
}