import { Frame, Observable, ObservableArray } from '@nativescript/core';

// Travel log Model
function travelLogModel(id) {
  let model = new Observable();

  // Details data
  model.id = id;
  model.title = '';
  model.date = null;
  model.img =
    'https://destinationlesstravel.com/wp-content/uploads/2022/04/Bailey-poses-for-a-photo-with-the-Playa-del-Carmen-sign-in-Mexico.jpg';
  model.img2 =
    'https://a.cdn-hotels.com/gdcs/production73/d1624/45ab7e53-4363-41f8-8783-78765ac502ee.jpg';
  model.companions = '';
  model.placesVisited1 = '';
  model.placesVisited2 = '';
  model.description1 = '';
  model.description2 = '';
  model.comments = '';

  // Expenses Data
  model.expenses = null;

  return model;
}

// loading new items to the listview
export function onLoad(args) {
  let page = args.object;
  let travelLog;

  if (page.navigationContext != null) {
    travelLog = page.navigationContext.models;
  } else {
    travelLog = new Observable();
    travelLog.logs = new ObservableArray(new travelLogModel(1));
  }

  page.bindingContext = travelLog;
}

// Accessing a specific item
export function onItemTap(args) {
  let page = args.object;
  let logs = page.bindingContext;

  Frame.topmost().navigate({
    moduleName: './details/details-page',
    context: {
      models: logs,
      index: args.index,
    },
    clearHistory: true,
  });
}

// Adding new items to the listview
export function addNew(args) {
  let page = args.object;
  let logs = page.bindingContext;

  logs.logs.push(new travelLogModel(logs.logs.length + 1));

  Frame.topmost().navigate({
    moduleName: './details/details-page',
    context: {
      models: logs,
      index: logs.logs.length - 1,
    },
    clearHistory: false,
  });
}
