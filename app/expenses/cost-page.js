import { Frame } from '@nativescript/core';

let Tindex;
let log;
let expense;

export function onLoad(args) {
  let page = args.object;

  Tindex = page.navigationContext.TravelIndex;
  log = page.navigationContext.models;

  let CostIndex = page.navigationContext.CostIndex;

  expense = log.logs.getItem(Tindex).expenses.getItem(CostIndex);

  page.bindingContext = expense;
}

export function update() {
  Frame.topmost().navigate({
    moduleName: './expenses/expenses-page',
    context: {
      models: log,
      index: Tindex,
    },
    clearHistory: true,
  });
}
