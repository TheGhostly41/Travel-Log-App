import { Frame } from '@nativescript/core';

let logs;
let Tindex;

// Loading saved data onto details page
export function onLoad(args) {
  let page = args.object;

  logs = page.navigationContext.models;

  Tindex = page.navigationContext.index;

  page.bindingContext = logs.logs.getItem(Tindex);
}

// Save information
export function update() {
  Frame.topmost().navigate({
    moduleName: './home/home-page',
    context: {
      models: logs,
      index: Tindex,
    },
    clearHistory: true,
  });
}

// View expense page
export function viewExpense() {
  Frame.topmost().navigate({
    moduleName: './expenses/expenses-page',
    context: {
      models: logs,
      index: Tindex,
    },
    clearHistory: false,
  });
}
