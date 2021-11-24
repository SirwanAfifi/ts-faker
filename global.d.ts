interface Window {
    ClipboardItem: any;
}

interface Clipboard extends EventTarget {
    write(data: any[]): Promise<void>;
}

interface ClipboardItem {
}

type ClipboardItemData = Blob

declare var ClipboardItem: {
    prototype: ClipboardItem;
    new(objects: Record<string, ClipboardItemData>): ClipboardItem;
};