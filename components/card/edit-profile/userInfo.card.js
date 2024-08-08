import { useTranslation } from "next-i18next";
const UserInfoCard = () => {
  const { t } = useTranslation("common");
  return (
    <div className="container pt-80 pb-40">
      <form action="">
        <div className="upload-pp">
          <img
            id="uploaded-img"
            className="show-img"
            src="/assets/images/upload-default.png"
            alt="your image"
          />
          <span className="filecontainer">
            <img src="/assets/images/icons/icon-camera-green.svg" alt="" />
            <input
              type="file"
              // onchange="readURL(this);"
            />
          </span>
        </div>
        <div className="input-wrapper">
          <input
            className="bg-white"
            placeholder="Name"
            id=""
            type="text"
            defaultValue="Lawson"
            readOnly=""
          />
        </div>
        <div className="input-wrapper">
          <input
            className="bg-white"
            placeholder="Surname"
            id=""
            type="text"
            defaultValue="Alma"
            readOnly=""
          />
        </div>
        <div className="input-wrapper">
          <input
            className="bg-white"
            placeholder="dd/mm/yyyy"
            id=""
            type="text"
            defaultValue="25/06/1996"
            readOnly=""
          />
        </div>
        <div className="input-wrapper">
          <input
            className="bg-white"
            placeholder="Email"
            id=""
            type="email"
            defaultValue="alma.lawson@example.com"
            readOnly=""
          />
          <div
            className="editbtn"
            // onclick="location.href='otp-current-email.html'"
          >
            <img src="/assets/images/icons/icon-edit-grey.svg" alt="" />
          </div>
        </div>
        <div className="input-wrapper">
          <input
            className="bg-white"
            placeholder="Phone"
            id=""
            type="text"
            defaultValue="(684) 555-0102"
            readOnly=""
          />
          <div
            className="editbtn"
            // onclick="location.href='otp-current-phone.html'"
          >
            <img src="/assets/images/icons/icon-edit-grey.svg" alt="" />
          </div>
        </div>
        <h2 className="mb-10">{t("health_profile")}</h2>
        <div className="input-wrapper d-flex col-gap-16 mb-20">
          <div className="input-group bg-white">
            <input
              type="text"
              className="form-control bg-white border-white"
              placeholder="Height"
              defaultValue={68}
            />
            <span className="input-group-text input-bg ms-0">cm</span>
          </div>
          <div className="input-group bg-white">
            <input
              type="text"
              className="form-control bg-white border-white"
              placeholder="Weight"
              defaultValue="176.5"
            />
            <span className="input-group-text input-bg ms-0">kg</span>
          </div>
        </div>
        <div className="d-flex col-gap-16">
          <div className="input-wrapper w-50 m-0">
            <select className="form-control bg-white" name="" id="">
              <option value="">{t("male")}</option>
              <option value="">{t("female")}</option>
            </select>
          </div>
          <div className="input-wrapper w-50 m-0">
            <select className="form-control bg-white" name="" id="">
              <option value="">{t("normal")}</option>
              <option value="">{t("option_1")}</option>
              <option value="">{t("option_2")}</option>
            </select>
          </div>
        </div>
        <div className="fixed-bottom bg-white-60-blur" id="show-element">
          <div className="container justify-content-between px-20 py-16">
            <button
              type="button"
              className="btn w-100"
              //   onclick="location.href='#'"
            >
              {t("save")}
              
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default UserInfoCard;
