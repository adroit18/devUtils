import { IAvailableUrls } from "../../../constants/interface";
import { LANGUAGE_OPTIONS, THEME_OPTIONS } from "./constant";

export const codeEditorSubUrls = function (MAX_ITER = 25): IAvailableUrls[] {
  const subUrls = [];
  for (
    let language = 0;
    language < LANGUAGE_OPTIONS.length && language < MAX_ITER;
    language += 1
  ) {
    subUrls.push({
      url: `code-editor/language-${LANGUAGE_OPTIONS[language]}`,
      name: `Code editor for ${LANGUAGE_OPTIONS[language]}`,
    });
    for (
      let themes = 0;
      themes < THEME_OPTIONS.length && themes < MAX_ITER;
      themes += 1
    ) {
      subUrls.push({
        url: `code-editor/language-${LANGUAGE_OPTIONS[language]}-theme-${THEME_OPTIONS[themes]}`,
        name: `Code editor for ${LANGUAGE_OPTIONS[language]} with theme ${THEME_OPTIONS[themes]}`,
      });
    }
  }
  return subUrls;
};
