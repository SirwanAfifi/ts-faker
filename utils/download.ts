import { toSQL } from "@core/transformer";
import { GeneratedType } from "../types";

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
