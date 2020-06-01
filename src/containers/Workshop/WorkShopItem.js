import React from "react";
import { useRecoilState } from "recoil";
import { Text, Heading, IconButton } from "evergreen-ui";
import { activeUser } from "../../state/atoms";

const WorkShopItem = ({ props }) => {
  const [user, setUser] = useRecoilState(activeUser);

  const addWorkShop = () => {
    setUser({
      ...user,
      selectWorkshops: [...user.selectWorkshops, props],
    });
  };

  return (
    <React.Fragment>
      <div className="workshop-item card">
        <div className="card-content">
          <div className="content">
            <Heading is="h5">{props?.title}</Heading>
          </div>
        </div>
        <footer className="card-footer">
          <Text className="card-footer-item">{props?.priceText}</Text>
          <IconButton
            className="add-workshop"
            icon="plus"
            height={35}
            onClick={() => addWorkShop()}
          />
        </footer>
      </div>
    </React.Fragment>
  );
};

export default WorkShopItem;
