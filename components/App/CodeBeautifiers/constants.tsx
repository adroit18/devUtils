import JsonFormatterBeautifier from "./Json";
import HtmlFormatterBeautifier from "./Html";
import CssFormatterBeautifier from "./Css";
import LessFormatterBeautifier from "./Less";
import ScssFormatterBeautifier from "./Scss";
import YamlFormatterBeautifier from "./Yaml";

export const BEAUTIFIERS = {
  JSON: <JsonFormatterBeautifier />,
  HTML: <HtmlFormatterBeautifier />,
  CSS: <CssFormatterBeautifier />,
  LESS: <LessFormatterBeautifier />,
  SCSS: <ScssFormatterBeautifier />,
  YAML: <YamlFormatterBeautifier />,
};
