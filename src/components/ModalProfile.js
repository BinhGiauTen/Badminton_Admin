// import React, { useState, useRef } from "react";
// import { Button } from "react-bootstrap";
// import Modal from "react-bootstrap/Modal";
// import { LuPencilLine } from "react-icons/lu";
// import { MdOutlineCameraAlt } from "react-icons/md";
// import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
// import { PiImageSquare } from "react-icons/pi";
// import { useDispatch, useSelector } from "react-redux";
// import { updateProfile, uploadAvatar } from "../features/user/userSlice";
// import { useFormik } from "formik";
// import { toast } from "react-toastify";

// const ModalProfile = () => {
//   const dispatch = useDispatch();

//   const [show, setShow] = useState(false);
//   const handleClose = () => {
//     setShow(false);
//   };
//   const handleShow = () => {
//     setShow(true);
//   };

//   const [stateOption, setStateOption] = useState("default");

//   const handleOpenUpdate = () => {
//     setStateOption("profile");
//   };

//   const handleUndoUpdate = () => {
//     setStateOption("default");
//   };

//   const handleOpenAvatar = () => {
//     setStateOption("avatar");
//   };

//   const handleUndoAvatar = () => {
//     setStateOption("default");
//   };

//   const userState = useSelector(
//     (state) => state?.user?.user?.user || state?.user?.user
//   );
//   const avatarSrc =
//     userState?.avatar === null
//       ? "images/avatar-default.jpg"
//       : userState?.avatar;

//   const dateString = userState?.dob;
//   const dateObject = new Date(dateString);

//   const year = dateObject.getFullYear();
//   const month = dateObject.getMonth() + 1;
//   const day = dateObject.getDate();

//   const formattedDate = `${day} tháng ${month}, ${year}`;

//   const [selectedGender, setSelectedGender] = useState(userState?.gender);
//   const handleGenderChange = (e) => {
//     setSelectedGender(e.target.value);
//   };

//   const [dateOfBirth, setDateOfBirth] = useState(
//     userState?.dob ? userState.dob.split("T")[0] : ""
//   );

//   const handleDateChange = (event) => {
//     setDateOfBirth(event.target.value);
//   };

//   const formik = useFormik({
//     initialValues: {
//       username: userState?.username,
//       gender: selectedGender,
//       dob: dateOfBirth,
//     },
//     onSubmit: async (values) => {
//       try {
//         dispatch(
//           updateProfile({
//             id: userState?._id,
//             userData: {
//               username: values.username,
//               gender: selectedGender,
//               dob: dateOfBirth,
//             },
//           }),
//           toast.success("Cập nhật thông tin thành công !!!")
//         );
//         handleClose();
//       } catch (error) {
//         console.log("Error updating profile:", error);
//       }
//     },
//   });

//   const fileInputRef = useRef(null);

//   const handleChooseAvatar = (event) => {
//     fileInputRef.current.click();
//   };

//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       const reader = new FileReader();
//       reader.onload = function (e) {
//         const preview = document.querySelector(".preview");
//         const img = document.createElement("img");
//         img.src = e.target.result;
//         img.style.maxWidth = "100%";
//         img.style.maxHeight = "200px"; // Đảm bảo ảnh không vượt quá khung preview
//         preview.innerHTML = ""; // Xóa nội dung cũ
//         preview.appendChild(img);
//       };
//       reader.readAsDataURL(file);
//     }
//   };
//   const upload = async () => {
//     console.log("CLick upload");
//     if (selectedFile) {
//       try {
//         const result = await dispatch(
//           uploadAvatar({ id: userState?._id, file: selectedFile })
//         );
//         if (result.error) {
//           throw new Error("Lỗi upload ảnh đại diện");
//         }
//         toast.success("Cập nhật ảnh đại diện thành công !!!");
//       } catch (error) {
//         toast.error("Lỗi upload ảnh đại diện !!!");
//       }
//     }
//   };

//   return (
//     <>
//       <li>
//         <div
//           className="dropdown-item py-1 mb-1"
//           style={{ height: "auto", lineHeight: "20px" }}
//         >
//           View Profile
//         </div>
//       </li>

//       <Modal show={show} onHide={handleClose} className="modal-profile-detail">
//         <Modal.Header closeButton>
//           <Modal.Title className="label-add-contact">
//             {stateOption === "default" && "Thông tin tài khoản"}
//             {stateOption === "profile" && (
//               <div className="d-flex gap-3">
//                 <MdOutlineKeyboardArrowLeft
//                   className="icon-back"
//                   onClick={handleUndoUpdate}
//                 />
//                 <div className="label-add-contact">
//                   Cập nhật thông tin cá nhân
//                 </div>
//               </div>
//             )}
//             {stateOption === "avatar" && (
//               <div className="d-flex gap-3">
//                 <MdOutlineKeyboardArrowLeft
//                   className="icon-back"
//                   onClick={handleUndoAvatar}
//                 />
//                 <div className="label-add-contact">Cập nhật ảnh đại diện</div>
//               </div>
//             )}
//           </Modal.Title>
//         </Modal.Header>
//         <form onSubmit={formik.handleSubmit}>
//           <Modal.Body>
//             {stateOption === "default" && (
//               <>
//                 <div className="content-profile-detail">
//                   <img
//                     src="https://res-zalo.zadn.vn/upload/media/2019/9/18/28_1568803270858_25195.jpg"
//                     alt="bg-avatar"
//                     className="bg-avatar"
//                   />
//                 </div>
//                 <div className="profile-info-container">
//                   <div className="profile-info-avatar">
//                     <img
//                       src={avatarSrc}
//                       alt=""
//                       className="profile-info-avatar-img"
//                     />
//                   </div>
//                   <div className="profile-info-name">{userState?.username}</div>
//                   <div
//                     className="profile-icon-update"
//                     onClick={handleOpenUpdate}
//                   >
//                     <LuPencilLine />
//                   </div>
//                   <div>
//                     <div className="profile-camera" onClick={handleOpenAvatar}>
//                       <MdOutlineCameraAlt className="profile-camera-icon" />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="profile-card-info">
//                   <div className="profile-card-info-heading">
//                     Thông tin cá nhân
//                   </div>
//                   <div className="profile-card-info-wrapper">
//                     <div className="profile-card-info-label">Giới tính</div>
//                     <div className="profile-card-info-content">
//                       {userState?.gender}
//                     </div>
//                   </div>
//                   <div className="profile-card-info-wrapper">
//                     <div className="profile-card-info-label">Ngày sinh</div>
//                     <div className="profile-card-info-content">
//                       {formattedDate}
//                     </div>
//                   </div>
//                   <div className="profile-card-info-wrapper">
//                     <div className="profile-card-info-label">Điện thoại</div>
//                     <div className="profile-card-info-content">
//                       {userState?.phone}
//                     </div>
//                   </div>
//                   <span className="profile-card-info-label">
//                     Chỉ bạn bè có lưu số máy của bạn trong danh bạ mới xem được
//                     số này
//                   </span>
//                 </div>
//               </>
//             )}
//             {stateOption === "profile" && (
//               <div className="update-profile-form">
//                 <div className="label-name">Tên hiển thị</div>
//                 <div className="wrapper-input-update-username">
//                   <input
//                     type="text"
//                     name="username"
//                     placeholder={formik.values.username}
//                     className="input-update-username"
//                     value={formik.values.username}
//                     onChange={formik.handleChange("username")}
//                   />
//                 </div>
//                 <div className="update-profile-label">Thông tin cá nhân</div>
//                 <div className="d-flex gap-5 mb-3">
//                   <div>
//                     <input
//                       type="radio"
//                       id="male"
//                       name="gender"
//                       value="Nam"
//                       checked={selectedGender === "Nam"}
//                       onChange={handleGenderChange}
//                     />
//                     <label className="label-radio">Nam</label>
//                   </div>
//                   <div>
//                     <input
//                       type="radio"
//                       id="html"
//                       name="gender"
//                       value="Nữ"
//                       checked={selectedGender === "Nữ"}
//                       onChange={handleGenderChange}
//                     />
//                     <label className="label-radio">Nữ</label>
//                   </div>
//                 </div>
//                 <div className="label-name">Ngày sinh</div>
//                 <input
//                   type="date"
//                   name="dob"
//                   className="my-3"
//                   value={dateOfBirth}
//                   onChange={handleDateChange}
//                 />
//               </div>
//             )}
//             {stateOption === "avatar" && (
//               <div style={{ padding: "10px 20px" }}>
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   accept="image/*"
//                   style={{ display: "none" }}
//                   onChange={handleFileChange}
//                 />
//                 <div onClick={handleChooseAvatar} className="btn-chosse-file ">
//                   <PiImageSquare
//                     style={{ fontSize: "20px", marginRight: "6px" }}
//                   />
//                   Tải ảnh lên từ máy tính
//                 </div>
//                 <div
//                   style={{
//                     fontSize: 16,
//                     fontWeight: 500,
//                     marginBottom: "16px",
//                   }}
//                 >
//                   Ảnh đại diện của tôi
//                 </div>

//                 <div className="profile-info-avatar">
//                   <img
//                     src={avatarSrc}
//                     alt=""
//                     className="profile-info-avatar-img"
//                   />
//                 </div>
//                 <div
//                   style={{
//                     fontSize: 16,
//                     fontWeight: 500,
//                     marginBottom: "16px",
//                     marginTop: "16px",
//                   }}
//                 >
//                   Ảnh đại diện mới
//                 </div>
//                 <div
//                   style={{
//                     height: "200px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                   className="preview"
//                 ></div>
//               </div>
//             )}
//           </Modal.Body>

//           {stateOption === "default" && (
//             <Modal.Footer>
//               <div
//                 className="profile-card-btn-update profile-card-modal-footer"
//                 onClick={handleOpenUpdate}
//               >
//                 <div className="profile-btn-update-icon">
//                   <LuPencilLine className="icon-img" />
//                 </div>
//                 Cập nhật
//               </div>
//             </Modal.Footer>
//           )}
//           {stateOption === "profile" && (
//             <Modal.Footer>
//               <div className="footer-update-profile gap-2">
//                 <Button variant="secondary" onClick={handleClose}>
//                   Hủy
//                 </Button>
//                 <Button variant="primary" type="submit">
//                   Cập nhật
//                 </Button>
//               </div>
//             </Modal.Footer>
//           )}
//           {stateOption === "avatar" && (
//             <Modal.Footer>
//               <div className="footer-update-profile gap-2">
//                 <Button variant="secondary" onClick={handleClose}>
//                   Hủy
//                 </Button>
//                 <Button variant="primary" onClick={upload}>
//                   Cập nhật
//                 </Button>
//               </div>
//             </Modal.Footer>
//           )}
//         </form>
//       </Modal>
//     </>
//   );
// };

// export default ModalProfile;
