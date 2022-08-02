function DanhSachNhanVien() {
    this.mangNV = [];

    this.themNhanVien = function (nv) {
        this.mangNV.push(nv);
    };

    this.timViTri = function (tk) {
        var viTri = -1;
        this.mangNV.map(function (item, index) {
            if (item.taiKhoan == tk) {
                viTri = index;
            }
        });
        return viTri;
    };

    this.xoaNhanVien = function (tk) {
        var viTri = this.timViTri(tk);
        if (viTri >= 0) {
            this.mangNV.splice(viTri, 1);
        };
    };

    this.capNhatSinhVien = function (nv) {
        var viTri = this.timViTri(nv.taiKhoan);
        if (viTri >= 0) {
            this.mangNV[viTri] = nv;
        }
    }
};

DanhSachNhanVien.prototype.timKiem = function (tuKhoaTK) {
    var mangKQ = [];
    // chuyển từ khóa tìm kiếm sang chữ thường
    var lowerTK = tuKhoaTK.trim().toLowerCase();
    this.mangNV.map(function (item, index) {
        // chuyển tên SV sang chữ thường
        var tenThuong = item.loaiNV.toLowerCase();
        var ketQua = tenThuong.indexOf(lowerTK);
        if (ketQua >= 0) {
            mangKQ.push(item);
        }
    });
    return mangKQ;
};