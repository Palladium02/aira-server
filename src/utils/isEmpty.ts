const isEmpty = (o: {[key: string]: any} | any[]) => {
  if(Array.isArray(o)) {
    return (o.length === 0) ? true : false;
  } else {
    return (Object.keys(o).length === 0) ? true : false;
  }
}

export default isEmpty;