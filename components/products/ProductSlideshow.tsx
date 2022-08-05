import {FC} from "react";
import {Slide} from "react-slideshow-image";

import "react-slideshow-image/dist/styles.css";
import styles from "./ProductSlideshow.module.css";

interface Props {
  images: string[];
}

export const ProductSlideshow: FC<Props> = ({images}) => {
  return (
    <>
      <Slide indicators duration={7000} easing="ease">
        {images.map((image) => {
          const url = `${image}`;

          return (
            <div key={image} className={styles["each-slide"]}>
              <div
                style={{
                  backgroundImage: `url(${url})`,
                  backgroundSize: "cover",
                }}
              />
            </div>
          );
        })}
      </Slide>
    </>
  );
};
