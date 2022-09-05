import { TableRow, TableCell, Table } from "@mui/material";
import classNames from "classnames";
import styles from "./table.module.scss";
import { FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { Fields, CityRecord, CitiesResponse } from "./interface";
import { v4 as uuidv4 } from "uuid";

const COMPONENT_HEIGHT = 500;
const COMPONENT_WIDTH = 1080;
const COMPONENT_COUNT = 1500;
const ITEM_SIZE = 50;
const COMPONENTS: Fields[] = [];
const CACHE: Record<string, string> = {};

const getUrl = (rows: number, start: number) =>
  `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=&rows=${rows}&start=${start}&sort=name&facet=feature_code&facet=cou_name_en&facet=timezone&timezone=Europe%2FMinsk`;

const Row = ({ index, style, data }: Record<string, any>) => {
  if (index + 1 > COMPONENT_COUNT) return null;
  const item = data[index] || null;
  if (!item) return null;

  return (
    <div
      className={classNames({
        [styles.even]: +index % 2,
        [styles.odd]: !(+index % 2),
      })}
      key={index}
      style={style}
    >
      <p>{index}</p>
      <p>{item.name || ""}</p>
      <p>{item.label_en || ""}</p>
      <p>{item.population || ""}</p>
    </div>
  );
};

const itemIndexLoaded = (index: number) => !!COMPONENTS[index];

const loadedMoreData = (start: number, end: number) => {
  const key = [start, end].join("/");
  console.log(key);

  if (CACHE[key]) {
    return;
  }

  const len = end - start;
  const itemsIndex = Array.from(Array(len).keys()).map(
    (index) => index + start
  );

  const givesItems = itemsIndex.every((index) => !!itemIndexLoaded(index));

  if (givesItems) {
    CACHE[key] = key;
    return;
  }
  console.log(`loaded`);

  return fetch(getUrl(len, start))
    .then((data) => data.json())
    .then((data: CitiesResponse) => {
      data.records.forEach((item: CityRecord, index: number) => {
        COMPONENTS[index + start] = item.fields;
      });
      console.log(COMPONENTS.length);
    });
};

export const TableVirtualized = () => {
  return (
    <InfiniteLoader
      isItemLoaded={itemIndexLoaded}
      loadMoreItems={loadedMoreData}
      itemCount={COMPONENT_COUNT}
    >
      {({ onItemsRendered, ref }) => (
        <FixedSizeList
          itemCount={COMPONENT_COUNT}
          itemSize={ITEM_SIZE}
          height={COMPONENT_HEIGHT}
          width={COMPONENT_WIDTH}
          itemData={COMPONENTS}
          ref={ref}
          onItemsRendered={onItemsRendered}
        >
          {({ index, style, data }) => Row({ index, style, data })}
        </FixedSizeList>
      )}
    </InfiniteLoader>
  );
};
