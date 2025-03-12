import { Box, Button, Typography } from '@mui/material'
import { LayoutBox } from '../../Profile/components/LayoutBox'
import './paymentUser.css'
function PaymentUser() {
  return (
    <LayoutBox>
      <Box sx={{ background: "#F2C2CF", padding: "15px", fontWeight: "bold", fontSize: "25px", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
        Thông tin thanh toán:
      </Box>

      <Box sx={{ fontSize: "20px" }}>

        <Box sx={{ padding: "15px", borderBottom: "1px solid #ddd", backgroundColor: "#fff" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontWeight: "bold", fontSize: "16px", marginBottom: "10px" }}>Thẻ tín dụng / ghi nợ</Typography>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#F2C2CF", color: "black", textTransform: "none", fontSize: "20px", borderRadius: "15px", padding: "0px 10px 0px 10px", marginRight: "30px", fontWeight: "500" }}
            >
              + Liên kết thẻ
            </Button>
          </Box>

          <hr style={{ border: "2px solid #000" }}></hr>

          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10px", padding: "30px", fontSize: "40px !important" }}>
            <Typography>Bạn chưa liên kết thẻ</Typography>
          </Box>
        </Box>

        <Box sx={{ marginTop: "40px", backgroundColor: "#fff", fontSize: "20px" }}>

          <Box sx={{ padding: "15px", fontWeight: "bold" }}>Tài khoản ngân hàng của tôi</Box>
          <hr style={{ border: "2px solid #000", marginLeft: "15px", marginRight: "20px" }}></hr>

          <Box sx={{ padding: "5px", marginLeft: "45px", fontSize: "15px" }}>
            <Typography>Ngân hàng : <strong>SACOMBANK</strong></Typography>
            <Typography>Họ tên chủ tài khoản : <strong>TRAN THI MY XOAN</strong></Typography>
            <Typography>Số tài khoản : <strong>012345678910</strong></Typography>
          </Box>

        </Box>

      </Box>
      {/*

      <Box sx={{ maxWidth: "600px", margin: "auto", borderRadius: "10px", overflow: "hidden", background: "#f8f8f8" }}>
        <Box sx={{ background: "#F2C2CF", padding: "15px", fontWeight: "bold", fontSize: "18px", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
          Thông tin thanh toán:
        </Box>
        <Box sx={{ padding: "20px", background: "white" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>Thẻ tín dụng / ghi nợ</Typography>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#F2C2CF", color: "black", textTransform: "none", fontSize: "14px", borderRadius: "20px", padding: "5px 15px", minWidth: "unset", boxShadow: "none", border: "1px solid #D69AA5" }}
            >
              + Liên kết thẻ
            </Button>
          </Box>
          <Box sx={{ borderBottom: "1px solid #777", marginTop: "5px" }} />
          <Box sx={{ textAlign: "center", marginTop: "20px", color: "#000", fontSize: "16px", fontWeight: "bold" }}>
            Bạn chưa liên kết thẻ
          </Box>
        </Box>
        <Box sx={{ background: "#F2C2CF", padding: "15px", fontWeight: "bold", fontSize: "16px" }}>Tài khoản ngân hàng của tôi</Box>
        <Box sx={{ padding: "20px", background: "white", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
          <Typography sx={{ fontSize: "14px", marginBottom: "5px" }}>Ngân hàng : <strong>SACOMBANK</strong></Typography>
          <Typography sx={{ fontSize: "14px", marginBottom: "5px" }}>Họ tên chủ tài khoản : <strong>TRAN THI MY XOAN</strong></Typography>
          <Typography sx={{ fontSize: "14px" }}>Số tài khoản : <strong>012345678910</strong></Typography>
        </Box>
      </Box> */}
    </LayoutBox>
  )
}

export default PaymentUser
