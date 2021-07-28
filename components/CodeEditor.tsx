import React from "react";
import Editor from "@monaco-editor/react";

interface MonacoProps {
  theme?: string;
  language?: string;
  value?: string;
  width?: number | string;
  height?: number | string;
  options?: any;
  onChange?: (value: string) => void;
}

export const Monaco: React.FC<MonacoProps> = ({
  language,
  value,
  height,
  width,
  options,
  onChange,
  theme,
}) => {
  return (
    <Editor
      theme={theme}
      defaultLanguage={language || "typescript"}
      defaultValue={`/*
      You can use some built-in data types:
        - DataType.USER_NAME
        - DataType.FIRST_NAME
        - DataType.LAST_NAME
        - DataType.PRICE
        - DataType.DESCRIPTION
*/\n\n

interface Person {
  userName: DataType.USER_NAME;
  firstName: DataType.FIRST_NAME;
  lastName: DataType.LAST_NAME;
  age: number;
  bio: DataType.DESCRIPTION
}

interface Product {
  id: number;
  title: string;
  description: DataType.DESCRIPTION;
  price: DataType.PRICE;
  addedAt: Date;
}

interface Author {
  id: number;
  name: DataType.FIRST_NAME;
  numberOfBooks: number;
}`}
      value={value}
      height={height}
      width={width}
      options={options}
      onChange={onChange}
      beforeMount={(monaco) => {
        const dataType = `enum DataType {
          USER_NAME,
          FIRST_NAME,
          LAST_NAME,
          PRICE,
          DESCRIPTION,
        }`;
        monaco.languages.typescript.typescriptDefaults.addExtraLib(
          dataType,
          "dataType.ts"
        );
      }}
    />
  );
};

export default Monaco;
