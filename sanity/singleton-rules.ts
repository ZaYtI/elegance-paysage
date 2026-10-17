import type { DocumentActionComponent, Template } from "sanity";
import { HOME_PAGE_TYPE } from "./schemas/home-page";

const FORBIDDEN_SINGLETON_ACTIONS = ["delete", "duplicate", "unpublish"];

export function withoutHomePageTemplate(templates: Template[]) {
  return templates.filter((template) => template.schemaType !== HOME_PAGE_TYPE);
}

export function withoutSingletonActions(actions: DocumentActionComponent[], schemaType: string) {
  if (schemaType !== HOME_PAGE_TYPE) return actions;
  return actions.filter((action) => !FORBIDDEN_SINGLETON_ACTIONS.includes(action.action ?? ""));
}
