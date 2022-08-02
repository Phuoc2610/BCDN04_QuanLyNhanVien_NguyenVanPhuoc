function NhanVien(tk,ten,email,mk,ngay,luong,cv,gio){
    this.taiKhoan = tk;
    this.tenNV = ten;
    this.email = email;
    this.matKhau = mk;
    this.ngayLam = ngay;
    this.luongCoBan = luong;
    this.chucVu = cv;
    this.gioLam = gio;
    this.tongLuong = 0;
    this.loaiNV = "";

    // tính tổng lương nhân viên
    this.tinhLuong = function(){
        if(this.chucVu == "Sếp"){
            this.tongLuong = this.luongCoBan * 3;
        }else if(this.chucVu == "Trưởng phòng"){
            this.tongLuong = this.luongCoBan * 2;
        }else if(this.chucVu == "Nhân viên"){
            this.tongLuong = this.luongCoBan ;
        }
        return this.tongLuong;
    }

    // xếp loại nhân viên
    this.xepLoai = function(){
        if(this.gioLam>=192){
            this.loaiNV = "Xuất sắc";
        }else if(this.gioLam>=176 && this.gioLam<192){
            this.loaiNV = "Giỏi";
        }else if(this.gioLam>=160 && this.gioLam<176){
            this.loaiNV = "Khá";
        }else if(this.gioLam>0 && this.gioLam<160){
            this.loaiNV = "Trung Bình";
        }
        return this.loaiNV;
    }
    
}