var dsnv = new DanhSachNhanVien();
var validation = new Validation();

function getELE(id) {
    return document.getElementById(id);
}

function setlocalStorage() {
    localStorage.setItem("DSNV", JSON.stringify(dsnv.mangNV));
}

function getLocalStorage() {
    if (localStorage.getItem("DSNV") != null) {
        dsnv.mangNV = JSON.parse(localStorage.getItem("DSNV"));
        hienThiTable(dsnv.mangNV);
    }
}
getLocalStorage();

function hienThiTable(mang) {
    var content = "";

    mang.map(function (item, index) {
        content += `<tr>
           <td>${item.taiKhoan}</td>
           <td>${item.tenNV}</td>
           <td>${item.email}</td>
           <td>${item.ngayLam}</td>
           <td>${item.chucVu}</td>
           <td>${item.tongLuong}</td>
           <td>${item.loaiNV}</td>
           <td>
           <button class="btn btn-danger" onclick="xoaNV('${item.taiKhoan}')" >Xóa</button>
           <button class="btn btn-info" data-toggle="modal"
           data-target="#myModal" onclick="xemChiTiet('${item.taiKhoan}')" >Xem</button>
           </td>
       </tr>`
    })
    getELE("tableDanhSach").innerHTML = content;
}

function themNhanVien() {
    // lấy thông tin từ form
    var taiKhoan = getELE("tknv").value;
    var tenNV = getELE("name").value;
    var email = getELE("email").value;
    var pass = getELE("password").value;
    var ngayLam = getELE("datepicker").value;
    var luongCoBan = getELE("luongCB").value;
    var chucVu = getELE("chucvu").value;
    var gioLam = getELE("gioLam").value;

    // console.log(taiKhoan, tenNV, email, pass, ngayLam, luongCoBan, chucVu, gioLam);

    //  Validation
    var isValid = true;

    isValid &= validation.checkEmpty(taiKhoan, "tbTKNV", "Tài khoản không được để trống") && validation.checkTK(taiKhoan, "tbTKNV", "Tài khoản đã được xử dụng", dsnv.mangNV);
    isValid &= validation.checkEmpty(tenNV, "tbTen", "Tên nhân viên không được để trống") && validation.checkName(tenNV, "tbTen", "Tên nhân viên phải là ký tự chữ");
    isValid &= validation.checkEmpty(email, "tbEmail", "Email không được để trống") && validation.checkEmail(email, "tbEmail", "Email không đúng định dạng");
    isValid &= validation.checkEmpty(pass, "tbMatKhau", "Mật khẩu không được để trống") && validation.checkPass(pass, "tbMatKhau", "Mật khẩu chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt");
    isValid &= validation.checkEmpty(luongCoBan, "tbLuongCB", "Lương cơ bản không được để trống") && validation.checkLuong(luongCoBan, "tbLuongCB", "Lương cơ bản phải từ 1 000 000 - 20 000 000");
    isValid &= validation.checkDropdown("chucvu", "tbChucVu", "Xin vui lòng chọn chức vụ");
    isValid &= validation.checkEmpty(gioLam, "tbGiolam", "Giờ làm không được để trống") && validation.checkGio(gioLam, "tbGiolam", "Giờ làm phải từ 80 - 200");

    if (isValid) {
        var nv = new NhanVien(taiKhoan, tenNV, email, pass, ngayLam, parseFloat(luongCoBan), chucVu, parseInt(gioLam));

        nv.tongLuong = nv.tinhLuong();
        nv.loaiNV = nv.xepLoai();
        // console.table(nv);

        dsnv.themNhanVien(nv);
        // console.log(dsnv.mangNV);

        setlocalStorage();

        hienThiTable(dsnv.mangNV);
    }

}

function xoaNV(tk) {
    dsnv.xoaNhanVien(tk);
    hienThiTable(dsnv.mangNV);
    setlocalStorage();
}

function xemChiTiet(tk) {
    var viTri = dsnv.timViTri(tk);
    var nv = dsnv.mangNV[viTri];

    getELE("tknv").disabled = true;

    getELE("tknv").value = nv.taiKhoan;
    getELE("name").value = nv.tenNV;
    getELE("email").value = nv.email;
    getELE("password").value = nv.pass;
    getELE("datepicker").value = nv.ngayLam;
    getELE("luongCB").value = nv.luongCoBan;
    getELE("chucvu").value = nv.chucVu;
    getELE("gioLam").value = nv.gioLam;
}

function capNhatNV() {
    var taiKhoan = getELE("tknv").value;
    var tenNV = getELE("name").value;
    var email = getELE("email").value;
    var pass = getELE("password").value;
    var ngayLam = getELE("datepicker").value;
    var luongCoBan = getELE("luongCB").value;
    var chucVu = getELE("chucvu").value;
    var gioLam = getELE("gioLam").value;

    var nv = new NhanVien(taiKhoan, tenNV, email, pass, ngayLam, parseFloat(luongCoBan), chucVu, parseInt(gioLam));

    nv.tongLuong = nv.tinhLuong();
    nv.loaiNV = nv.xepLoai();

    dsnv.capNhatSinhVien(nv);
    hienThiTable(dsnv.mangNV);
    setlocalStorage();
}

function resetForm() {
    getELE("formQLNV").reset();
    getELE("tknv").disabled = false;
}

function timKiemTheoLoai() {
    var tuKhoaTK = getELE("searchName").value;
    var mangKQ = dsnv.timKiem(tuKhoaTK);
    hienThiTable(mangKQ);
}

getELE("btnThemNV").onclick = themNhanVien;
getELE("btnCapNhat").onclick = capNhatNV;
getELE("btnTimNV").onclick = timKiemTheoLoai;
getELE("btnReset").onclick = resetForm;
