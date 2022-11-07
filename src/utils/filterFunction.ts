import { Item } from "store/api-slice";

interface Query {
  isHighlight?: string;
  isPublicDomain?: string;
  sort?: string;
  artist?: string;
  artwork?: string;
  slider?: string;
}

export const filterFunction = (data: Item[], query: Query): Item[] | null => {
  let filteredData = data;

  //фильтры даты
  if (query.artist) {
    filteredData = filteredData.filter((el) => {
      return el.artistDisplayName.toLowerCase() === query.artist;
    });
  }

  if (query.isHighlight === "true") {
    filteredData = filteredData.filter((el) => {
      return el.isHighlight;
    });
  }

  if (query.isPublicDomain === "true") {
    filteredData = filteredData.filter((el) => {
      return el.isPublicDomain;
    });
  }

  if (query.slider) {
    const min = query.slider.split(" ")[0];
    const max = query.slider.split(" ")[1];
    filteredData = filteredData.filter(
      (el) =>
        el.objectEndDate >= parseInt(min, 10) &&
        el.objectEndDate <= parseInt(max, 10)
    );
  }

  //сортировка даты
  if (query.sort) {
    const sortParams = query.sort.split(" ");
    let sortedData = [...filteredData];

    if (sortParams[0] === "objectEndDate") {
      filteredData = sortedData.sort((a, b) => {
        return sortParams[1] === "up"
          ? a[sortParams[0]] - b[sortParams[0]]
          : b[sortParams[0]] - a[sortParams[0]];
      });
    } else {
      filteredData = sortedData.sort((a, b) => {
        let nameA = a[sortParams[0]].toLowerCase();
        let nameB = b[sortParams[0]].toLowerCase();

        if (nameA[0] === "'" || nameA[0] === "(" || nameA[0] === '"') {
          const regex = /[a-z]/;
          nameA = nameA.slice(nameA.match(regex).index);
        }
        if (nameB[0] === "'" || nameB[0] === "(" || nameB[0] === '"') {
          const regex = /[a-z]/;

          nameB = nameB.slice(nameB.match(regex).index);
        }
        if (nameA === nameB) {
          return 0;
        }
        if (nameA === "") {
          return 1;
        }
        if (nameB === "") {
          return -1;
        }

        if (sortParams[1] === "up") {
          return nameA < nameB ? 1 : -1;
        }
        return nameA < nameB ? -1 : 1;
      });
    }
  }

  return filteredData;
};
