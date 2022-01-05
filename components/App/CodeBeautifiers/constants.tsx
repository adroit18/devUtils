import JsonFormatterBeautifier from "./Json";
import HtmlFormatterBeautifier from "./Html";
import CssFormatterBeautifier from "./Css";
import LessFormatterBeautifier from "./Less";
import ScssFormatterBeautifier from "./Scss";
import YamlFormatterBeautifier from "./Yaml";
import JavascriptFormatterBeautifier from "./Javascript";
import TypescriptFormatterBeautifier from "./Typescript";
import AngularFormatterBeautifier from "./Angular";
import GraphqlFormatterBeautifier from "./Graphql";

export const BEAUTIFIERS = {
  Json: <JsonFormatterBeautifier />,
  Html: <HtmlFormatterBeautifier />,
  Css: <CssFormatterBeautifier />,
  Less: <LessFormatterBeautifier />,
  Scss: <ScssFormatterBeautifier />,
  Yaml: <YamlFormatterBeautifier />,
  Javascript: <JavascriptFormatterBeautifier />,
  Typescript: <TypescriptFormatterBeautifier />,
  Angular: <AngularFormatterBeautifier />,
  Graphql: <GraphqlFormatterBeautifier />,
};
