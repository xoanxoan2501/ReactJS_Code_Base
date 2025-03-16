import { Box, Typography, TextField, Button, Container } from '@mui/material'
import './ContractHome.css'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
const ContactHome = () => {
  return (
    <div className="contract_home">
      <div className="contract_cc">
        <Container>
          <h3>Liên hệ</h3>
          <Typography>
            Tự hào là 1 trong những Brand uy tín gần 30 năm tại Hà Nội. Napun
            Bakery đã và luôn đồng hành cung cấp sản phẩm cho các Brand lớn
            trong ngành dịch vụ ( Chuỗi Coffee, Nhà hàng, Khách sạn, Sự kiện...)
            Với đầy đủ các sản phẩm phong phú và đa dạng từ Bánh Mì, Bánh Tươi,
            Cookies, Bánh Gato , Bánh Mousse... Napun Bakery hân hạnh được hợp
            tác !
          </Typography>
          <div className="cc_cc">
            <Box className="icon_cc">
              <PhoneIcon sx={{ color: '#F2C2CF', fontSize: 24 }} />
            </Box>
            <Typography>0969634028 | 0815142648</Typography>
          </div>
          <div className="cc_cc">
            <Box className="icon_cc">
              <EmailIcon sx={{ color: '#F2C2CF', fontSize: 24 }} />
            </Box>
            <Typography>abc@gmail.com</Typography>
          </div>
          <div className="cc_cc">
            <Box className="icon_cc">
              <AccessTimeIcon sx={{ color: '#F2C2CF', fontSize: 24 }} />
            </Box>
            <Typography>8:00 - 21:00 Thứ 2 - Chủ Nhật</Typography>
          </div>
        </Container>
      </div>
      <div className="contract_inf">
        <Container>
          <div className="textField_contract">
            <Typography>Họ và tên</Typography>
            <TextField
              id="outlined-basic"
              label="Nhập họ và tên"
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="textField_contract">
            <Typography>Số điện thoại </Typography>
            <TextField
              id="outlined-basic"
              label="Nhập số điện thoại "
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="textField_contract">
            <Typography>Mô hình kinh doanh</Typography>
            <TextField
              id="outlined-basic"
              label="Chuỗi nhà hàng, quán cafe,... "
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="textField_contract">
            <Typography>Nhập địa chỉ email</Typography>
            <TextField
              id="outlined-basic"
              label="Nhập địa chỉ email"
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="button_cc">
            <Button className="custom_button">
              Gửi đăng kí để nhận báo giá
            </Button>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default ContactHome
