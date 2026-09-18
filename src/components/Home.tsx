import { Hero } from './Hero';
import { FactBar } from './FactBar';
import { SelectedWork } from './SelectedWork';
import { ConsoleStrip } from './ConsoleStrip';

/**
 * Hero, then proof, then work. The console moved below the work rows and shrank to a single
 * line: it is a nice touch, but it was sitting between the claim and the evidence for it.
 */
export function Home() {
  return (
    <>
      <Hero />
      <FactBar />
      <SelectedWork />
      <ConsoleStrip compact />
    </>
  );
}
