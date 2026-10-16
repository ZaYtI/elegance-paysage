import { INTRO_SKIP_SCRIPT } from "./intro-storage";

export function IntroSkipScript() {
  return <script dangerouslySetInnerHTML={{ __html: INTRO_SKIP_SCRIPT }} />;
}
