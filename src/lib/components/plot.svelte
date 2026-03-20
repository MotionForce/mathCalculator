<script lang="ts">
  import { compile, range, type Fraction, fraction } from "mathjs";
  import { onMount } from "svelte";
  // @ts-expect-error
  import Plot from "svelte-plotly.js";

  onMount(() => {
    drawPlot();
  });

  function drawPlot() {
    try {
      // compile the expression once
      const expression = `${a} * (x - ${h})^2 + ${k}`;
      const expr = compile(expression);

      // evaluate the expression repeatedly for different values of x
      const xValues = range(-10, 10, 0.5).toArray();
      const yValues = xValues.map(function (x) {
        return expr.evaluate({ x: x });
      });

      // render the plot using plotly
      const trace1 = {
        x: xValues,
        y: yValues,
        type: "scatter",
      };
      data = [trace1];
    } catch (err) {
      console.error(err);
    }
  }

  interface Props {
    a?: Fraction;
    h?: Fraction;
    k?: Fraction;
  }

  let { a = fraction(1), h = fraction(0), k = fraction(0) }: Props = $props();

  var data: any[] = $state([]);
</script>

<Plot
  {data}
  layout={{
    margin: { t: 0 },
  }}
  fillParent="width"
  debounce={250}
  class="rounded-2xl bg-surface-500-400-token"
/>
