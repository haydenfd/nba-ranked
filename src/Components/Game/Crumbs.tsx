import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";

export const GuessCrumbs = () => {
  const snapshot = useSelector((state: RootState) => state.snapshot);

  return (
    <div className={`w-full mx-auto flex justify-center `}>
      <Breadcrumbs className="bg-white p-4 rounded mx-auto">
        {snapshot.selected &&
          snapshot.score &&
          snapshot.selected.map((item, idx) => (
            <BreadcrumbItem
              classNames={{
                item: `text-2xl text-red-400  ${snapshot.score[idx] === 0 ? "text-green-400" : snapshot.score[idx] === -1 ? "text-red-400" : "text-yellow-500"}`,
                separator: `text-2xl text-black font-bold`,
              }}
              disableAnimation={true}
            >
              {item.PLAYER_NAME}
            </BreadcrumbItem>
          ))}
      </Breadcrumbs>
    </div>
  );
};
