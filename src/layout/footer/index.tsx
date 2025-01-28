import { Box, Typography } from '@mui/material'
import logoIconFooter from '@/assets/images/imageLogo.png'
import mapIconFooter from '@/assets/icons/mapFooterIcon.png'
import phoneIconFooter from '@/assets/icons/phoneFooterIcon.png'
import letterIconFooter from '@/assets/icons/letterFooterIcon.png'
import './Footer.scss'

const Footer = () => {
  return (
		<footer className="footer">
			<div className="container" style={{ display: 'flex'}}>
				<div className="first_child">
					<img
						src={logoIconFooter}
						alt="logo"
						className="header_logo icon_hover"
					/>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							width: '100%',
							height: '50px',
							gap: '1rem'
						}}
					>
						<img
							src={mapIconFooter}
							alt="logo"
							className="header_logo icon_hover"
							style={{ width: '30px', height: '30px' }}
						/>
						<span>
							Địa chỉ: 180 Cao Lỗ, Phường 4, Quận 8, TP.HCM
						</span>
					</Box>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							width: '100%',
							height: '50px',
							gap: '1rem'
						}}
					>
						<img
							src={phoneIconFooter}
							alt="logo"
							className="header_logo icon_hover"
							style={{ width: '30px', height: '30px' }}
						/>
						<span>0969634028 | 0815142648</span>
					</Box>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							width: '100%',
							height: '50px',
							gap: '1rem'
						}}
					>
						<img
							src={letterIconFooter}
							alt="logo"
							className="header_logo icon_hover"
							style={{ width: '30px', height: '30px' }}
						/>
						<span>abcd@gmail.com</span>
					</Box>
				</div>
				<div className="second_child">
          <Typography variant='h5'>Chính sách</Typography>
          <span>Chính sách bảo mật</span>
          <span>Chính sách khuyến mãi</span>
          <span>Chính sách đổi trả</span>
        </div>
				<div className="third_child"></div>
			</div>
		</footer>
  )
}

export default Footer
