const dynamicSorting = (key, order = 'asc') => {
  
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }

    const varA = (typeof a[key] === 'string')
      ? a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string')
      ? b[key].toUpperCase() : b[key];

    let comparation = 0;
    if (varA > varB) {
      comparation = 1;
    } else if (varA < varB) {
      comparation = -1;
    }
    return (
      (order === 'desc') ? (comparation * -1) : comparation
    );
  };
}

export default dynamicSorting;