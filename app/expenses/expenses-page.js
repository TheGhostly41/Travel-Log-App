import { Frame, Observable, ObservableArray } from '@nativescript/core';

let logs;
let Tindex;

// Expense Model
function ExpenseModel(id) {
  let model = new Observable();

  model.id = id;

  model.description = '';
  model.cost = '';
  model.total = '';

  return model;
}

// loading items onto the list
export function onLoad(args) {
  let page = args.object;
  let expLog;

  logs = page.navigationContext.models;
  Tindex = page.navigationContext.index;

  expLog = logs.logs.getItem(Tindex);

  if (expLog.expenses == null) {
    expLog.expenses = new ObservableArray();
  }

  // Calculating Total cost
  let TotalCost = 0;

  expLog.expenses.forEach((item) => {
    TotalCost += Number(item.cost);
  });

  expLog.total = TotalCost.toFixed(2);

  page.bindingContext = expLog;
}

// Accessing item
export function onItemTap() {
  Frame.topmost().navigate({
    moduleName: './expenses/cost-page',
    context: {
      models: logs,
      index: Tindex,
    },
    clearHistory: true,
  });
}

// Adding new expense
export function addNew(args) {
  let page = args.object;
  let expLog = page.bindingContext;

  expLog.expenses.push(new ExpenseModel(expLog.expenses.length + 1));

  Frame.topmost().navigate({
    moduleName: './expenses/cost-page',
    context: {
      models: logs,
      CostIndex: expLog.expenses.length - 1,
      TravelIndex: Tindex,
    },
    clearHistory: true,
  });
}

// Go back to home page
export function goBack() {
  Frame.topmost().navigate({
    moduleName: './home/home-page',
    context: {
      models: logs,
      index: Tindex,
    },
    clearHistory: true,
  });
}
