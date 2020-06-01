import styled from "styled-components";

const App = styled.div`
  position: relative;
  background-color: white;
  margin: 0% 8%;
  /*
  box-shadow: 1px 5px 25px -10px #a9a9a9;
  border-radius: 5px;
  */
  min-height: 650px;
  margin-bottom: 200px;

  > .content {
    padding: 5px 0px;
  }

  .payment-method {
    border-top: 1px solid #ddd;
    margin-top: -25px;
    padding-top: 25px;
    border-bottom: 1px solid #333;
    padding-bottom: 25px;
    div {
      display: flex;
      label {margin-right: 50px;}
    }
}

  .total {
      text-align: right;
      font-size: 1.4em;
    }

    .total span {
        display: block;
    }

    .total strong {
        color: #ff7944;
    }
`;

const EventHeaderBox = styled.div`
  background-color: #004d92;
  margin-bottom: 40px;

  .hero-body {
    padding: 15px 25px;
    * {
      color: #fff;
    }

    .title {
      margin-bottom: 30px;
      text-shadow: -3px 3px 2px #00000070;
    }
    h2.subtitle strong {
      display: inline-block;
      margin-right: 60px;
      font-weight: 300;
      font-size: 0.8em;
    }
  }
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  font-size: 1rem;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  svg {
    margin-right: 10px;
  }
`;

const Title = styled.h1`
  letter-spacing: 8px;
`;

const Image = styled.img`
  height: 30vh;
  transform: ${(props) => `rotate(${props.angle}deg)`};
`;

const LoadingStyle = styled.div`
  background-color: #004d920d;
  text-align: center;
  padding: 100px 0 90px;
  font-size: 60px;
  margin-top: -40px;

  .fa-stack svg {
    color: #0000002e;
  }
`;

const UserItemStyle = styled.div`
  border: 1px solid #ccc;
  padding: 15px 15px 0;
  margin-bottom: 20px;
  border-radius: 4px;
  position: relative;

  &.user-information {
    margin-top: -47px;
    border-top: none;
    box-shadow: 1px 13px 25px -24px #000;
  }

  .user-box {
      margin-bottom: 25px;
      h5 {
        color: #808080;
        border-bottom: 1px solid #dadada;
        padding-bottom: 5px;
     }
     .user-edit-icon {
        float: left;
        color: #092c58;
        background-color: #9bc9ea;
        border-radius: 2px;
        padding: 5px;
        margin-right: 10px;
        cursor: pointer;
    }
    .additional-services.user-box li {
      display: block;
      margin-bottom: 5px;
      line-height: 30px;
    }
    .delete-workshop {
      float: left;
      color: #6d0d0d;
      background-color: #ffcccc6b;
      border-radius: 4px;
      padding: 5px;
      cursor: pointer;
      margin-left: -30px;
    }
     span.price {
      float: right;
      font-weight: 600;
     }
  }

  .card {
    background: none;
    box-shadow: none;
    * {
      display: block;
    }

    .card-header {
      display: grid;
      padding: 0;
      background: none;
      box-shadow: none;
      grid-template-columns: 6fr 1fr;
      margin-bottom: 25px;
      .card-header-title {
        margin: 0;
        padding: 0;
        font-weight: 300;
      }
      .right {
        text-align: right;
        .user-price {
          color: #ff7944;
        }
      }
    }
    .card-content {
      padding: 0;
    }
  }

  .user-button {
    position: absolute;
    right: -60px;
    top: -12px;

    button {
      display: block;
      cursor: pointer;
      padding: 5px 10px;
      width: 35px !important;
      height: 30px !important;
      border: 1px solid transparent;
      background-color: #fff;
      border-radius: 3px;
      margin-bottom: 5px;

      &:hover {
        border-color: #004d92;
      }

      &.editBtn {
        background-color: #e8f2fd;
        svg {
          color: #1e90f8;
        }
      }
      &.deleteBtn {
        background-color: #ffeceb;
        svg {
          color: #f65a3d;
        }
      }
    }
  }

  .show-more {
    display: block;
    border: none !important;
    outline: none !important;
    background: none;
    margin: 0 auto;
    cursor: pointer;

    &:hover {
      color: #234fa0;
    }
  }
`;

const RegistrationTypeStyle = styled.div`
  .item {
    display: block;
    position: relative;
    cursor: pointer;
    margin-bottom: 5px;
    padding: 15px 15px;
    border: 2px solid #eee;
    font-size: 1.1rem;
    border-radius: 4px;

    &:hover,
    &.selected {
      border-color: #004d92;
    }

    input {
      display: inline-block;
      margin-right: 10px;
    }
    .right {
      float: right;
      margin-top: -35px;

      .edit {
        margin-left: 10px;
        cursor: pointer;
        padding: 5px 10px;
        width: 35px;
        height: 30px;
        border: 1px solid transparent;
        background-color: #fff;
        border-radius: 3px;
        margin-bottom: 5px;
        float: right;
        background-color: #e8f2fd;
        svg {
          color: #1e90f8;
        }

        &:hover {
          background-color: #0000001a;
          color: #fff;
        }
      }
    }
  }
`;

const FixedFooterMenu = styled.div`
  position: fixed;
  background: #fff;
  z-index: 9999;
  border-top: 1px solid #ccc;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px 0;

  .container {
    margin: 0% 8%;

    .next-stepBtn {
      float: right;
    }
  }
`;

const Form = styled.form``;

const WorkshopPage = styled.div`
  .page-title {
    color: #0d89a7;
  }
  .workshop-item {
    box-shadow: none;
    border: 1px solid #ddd;
    border-radius: 5px;

    .add-workshop {
      width: 50px !important;
      margin: 5px 20px;
    }
  }
`;

const RegistrationSummaryPage = styled.div`
  

`;




export {
  Button,
  Title,
  App,
  Image,
  Form,
  LoadingStyle,
  UserItemStyle,
  RegistrationSummaryPage,
  RegistrationTypeStyle,
  WorkshopPage,
  FixedFooterMenu,
  EventHeaderBox,
};
