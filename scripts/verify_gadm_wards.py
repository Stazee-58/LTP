import shapefile
import json
import sys
from shapely.geometry import shape, mapping, Polygon, MultiPolygon

sys.stdout.reconfigure(encoding='utf-8')

sf = shapefile.Reader('scripts/gadm_data/VNM_adm4.shp', encoding='latin1')

# Test indices
test_map = {
    'khuong-trung': (2524, 'Phường Khương Trung'),
    'khuong-dinh': (2522, 'Phường Khương Đình'),
    'ha-dinh': (2521, 'Phường Hạ Đình'),
    'nhan-chinh': (2526, 'Phường Nhân Chính'),
    'phuong-liet': (2527, 'Phường Phương Liệt'),
    'khuong-thuong': (2302, 'Phường Khương Thượng'),
    'thinh-quang': (2315, 'Phường Thịnh Quang'),
    'lang-thuong': (2306, 'Phường Láng Thượng'),
    'lang-ha': (2305, 'Phường Láng Hạ'),
    'kim-lien': (2304, 'Phường Kim Liên'),
    'quoc-tu-giam': (2312, 'Phường Quốc Tử Giám'),
    'van-mieu': (2320, 'Phường Văn Miếu'),
    'dien-bien': (2346, 'Phường Điện Biên'),
    'ngoc-ha': (2351, 'Phường Ngọc Hà'),
    'giang-vo': (2348, 'Phường Giảng Võ'),
    'truc-bach': (2357, 'Phường Trúc Bạch'),
    'quan-thanh': (2355, 'Phường Quán Thánh'),
    'dich-vong': (2359, 'Phường Dịch Vọng'),
    'yen-hoa': (2366, 'Phường Yên Hòa'),
    'nghia-do': (2362, 'Phường Nghĩa Đô'),
    'dich-vong-hau': (2360, 'Phường Dịch Vọng Hậu'),
    'trang-tien': (2426, 'Phường Tràng Tiền'),
    'hang-bac': (2415, 'Phường Hàng Bạc'),
    'hang-dao': (2413, 'Phường Hàng Đào'),
    'dong-xuan': (2409, 'Phường Đồng Xuân'),
    'dong-nhan': (2389, 'Phường Đồng Nhân'),
    'bach-mai': (2393, 'Phường Bạch Mai'),
    'dong-tam': (2390, 'Phường Đồng Tâm'),
    'thanh-luong': (2405, 'Phường Thanh Lương'),
}

for slug, (idx, name) in test_map.items():
    rec = sf.record(idx)
    shp = sf.shape(idx)
    geom = shape(shp.__geo_interface__)
    print(f"[{slug:20}] (idx {idx}) {name:25} | type: {geom.geom_type:12} | pts: {len(shp.points):4d} | bounds: {[round(b, 5) for b in geom.bounds]}")
