import { toSQL } from "@core/transformer";
import { GeneratedType, OutputFormat } from "../types";

export const downloadObjectAsJson = (
  exportObj: unknown,
  exportName: string
) => {
  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(exportObj));
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", `${exportName}.json`);
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

export const downloadObjectAsSQL = (exportObj: GeneratedType) => {
  const dataStr =
    "data:text/json;charset=utf-8," + encodeURIComponent(toSQL(exportObj));
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", `${exportObj.name}.sql`);
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

export const copyData = async (input: unknown, outputFormat: OutputFormat) => {
  try {
    const type = "text/plain";
    const blob = new Blob([outputFormat === OutputFormat.SQL ? toSQL(input as GeneratedType) : JSON.stringify(input)], { type });
    const data = [new ClipboardItem({ [type]: blob } as unknown as Record<string, ClipboardItemData>)];
    await navigator.clipboard.write(data)
  } catch (error) {
    alert("Can't Copy The Data")
  }
}