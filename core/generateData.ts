import { getOtherType, transform } from "../core";
import { DataItem, GeneratedType, MemberType } from "../types";
import { OPTIONS } from "../config";
import { GeneratorLib } from ".";

export const generateMockData = async (
  source: string,
  options = OPTIONS
): Promise<GeneratedType[]> => {
  const interfaces = await transform(source);
  const generatedTypes: GeneratedType[] = [];
  for (const item of interfaces) {
    const generatedType: GeneratedType = { name: "", data: [] };
    generatedType.name = item.itemName;
    const itemMembers = item.members;
    Array.from({ length: +options.scale }).forEach((_) => {
      const row: DataItem = {};
      for (const member of itemMembers) {
        const memberType = member.type;
        switch (memberType) {
          case MemberType.STRING:
            row[member.name] = GeneratorLib.text();
            break;
          case MemberType.NUMBER:
            row[member.name] = GeneratorLib.number({
              max: +options.numberMax,
            });
            break;
          case MemberType.BOOLEAN:
            row[member.name] = GeneratorLib.boolean();
            break;
          case MemberType.DATE:
            row[member.name] = GeneratorLib.datetime();
            break;
          default:
            row[member.name] = getOtherType(member);
            break;
        }
      }
      generatedType.data.push(row);
    });
    generatedTypes.push(generatedType);
  }
  return generatedTypes;
};
