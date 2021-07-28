import { SOURCE_PATH } from "../config";
import {
  InterfaceTypeItem,
  InterfaceMember,
  MemberOtherDataType,
  GeneratedType,
} from "../types";
import { GeneratorLib } from ".";

export const transform = async (
  fileText: string
): Promise<InterfaceTypeItem[]> => {
  const { Project } = await import("ts-morph");

  const project = new Project({
    useInMemoryFileSystem: true,
    compilerOptions: {
      lib: ["DOM", "ESNext"],
      allowJs: false,
      noEmit: true,
      skipLibCheck: true,
      noImplicitAny: false,
      baseUrl: ".",
    },
  });

  const sourceFile = project.createSourceFile(SOURCE_PATH, fileText);
  const interfaces = sourceFile.getInterfaces().map((i) => ({
    itemName: i.compilerNode.name.getText(),
    members: i.getMembers().map((m) => ({
      name: m.compilerNode.name.getText(),
      type: m.compilerNode.type.getText(),
    })),
  }));

  return interfaces;
};

export const toSQL = (item: GeneratedType) => {
  let sql: string = "";
  sql += `INSERT INTO ${item.name} VALUES ${item.data
    .map(
      (m) =>
        `(${Object.values(m)
          .map((o) => `'${JSON.stringify(o)}'`)
          .join(",")})`
    )
    .join(",")}\n\n`;
  return sql;
};

export const getOtherType = (member: InterfaceMember) => {
  const pattern = /^DataType\.(?<dataType>\w+)$/;
  const matchResult = member.type.match(pattern);
  if (!matchResult) return GeneratorLib.string();
  const dataType = matchResult.groups.dataType as MemberOtherDataType;
  switch (dataType) {
    case MemberOtherDataType.USER_NAME:
      return GeneratorLib.userName();
    case MemberOtherDataType.FIRST_NAME:
      return GeneratorLib.firstName();
    case MemberOtherDataType.LAST_NAME:
      return GeneratorLib.lastName();
    case MemberOtherDataType.FULL_NAME:
      return GeneratorLib.fullName();
    case MemberOtherDataType.PRICE:
      return GeneratorLib.price();
    case MemberOtherDataType.DESCRIPTION:
      return GeneratorLib.sentence();
    default:
      return GeneratorLib.string();
  }
};
