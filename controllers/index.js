import { Glasses } from '../models/Glasses.js';
import { Model } from '../models/Model.js';
let arrGlasses = [];


let getData = async function () {
    try {
        let result = await axios({
            url: '/data/data.json', //url backend qui định
            method: 'GET',//Phương thức backend qui định
            responseType: 'json',//Kiểu dữ liệu server trả về BE qui định
        });
        //Sau khi gọi api có dữ liệu gửi về => Tạo lớp đối tượng chứa thông tin kính
        arrGlasses = result.data;
        renderGlasses(arrGlasses);
    } catch (err) {
        console.log(err);
    }

}

const renderGlasses = (arrResult) => {
    console.log(arrResult);
    //Từ mảng dữ liệu => tạo giao diện kính cho người dùng chọn
    const contentGlasses = arrResult.reduce((content, item, index) => {
        return content += `
            <div class="col-4" >
                <img style="width:100%;height:100%;cursor:pointer;" src="${item.src}" alt="${item.src}" onclick="renderGlassModel('${item.id}')" />
                </div>
        `
    }, '');

    //dom giao diện => in ra màn hình
    document.querySelector('#vglassesList').innerHTML = contentGlasses;
}
getData();

//dữ liệu model sẽ đại diện cho thành phần giao diện người mẫu 
let model = new Model();
window.renderGlassModel = (id = 0) => {

    //Từ id kính => lấy ra kính trong mảng
    let newGlasses = arrGlasses.find(gl => gl.id === id);
    console.log(newGlasses);
    if (newGlasses) {
        //Gọi phương thức thay đổi giá trị thuộc tính Glasses
        model.changeGlasses(newGlasses);
        //Gọi phương thức tạo giao diện
        document.getElementById('glassesDetail').src = model.glassesDetail.virtualImg;
        let contentHTML=`
        <ul>
        <li>${newGlasses.id}</li>
        <li>${newGlasses.name}</li>
        <li>${newGlasses.price}</li>
        <li>${newGlasses.desciption}</li>
        </ul>
        `;
        document.querySelector('#glassesInfo').innerHTML=contentHTML;
        
    }
}
renderGlassModel();




