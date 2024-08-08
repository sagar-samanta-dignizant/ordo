import React from 'react'

const partners = [
	{
		link: '',
		image: '/assets/images/footer/google.svg',
		name: 'Google'
	},
	{
		link: '',
		image: '/assets/images/footer/trip-advisor.svg',
		name: 'TripAdvisor'
	},
	{
		link: '',
		image: '/assets/images/footer/facebook.svg',
		name: 'Facebook'
	},
	{
		link: '',
		image: '/assets/images/footer/the-fork.svg',
		name: 'The Fork'
	}
]

export default function ReviewPartnerCard() {

	return (
		<div className="mb-20 px-0 review-partner">
			<h2
				className="mb-12 px-20"
				style={{ fontFamily: "SF-Semi", fontSize: "20px" }}
			>
				Review Partners
			</h2>

			<div className="card-list-group-100 px-20">
				<div
					className="card mb-16 p-0"
					style={{
						padding: "0px 4px",
						fontFamily: "SF-Semi",
						fontSize: "16px",
					}}
				>
					{partners.map((partner) => (
						<a href={partner.link} target="_blank" rel="noopener noreferrer">
							<div className="card-content">
								{/* <figure className="card-content-img" > */}
								<figure style={{ width: "40px", height:"40px" }}>
									<img
										className="rounded-circle"
										src={partner.image}
										alt=""
										style={{ objectFit: "cover", width: "40px", height:"40px" }}
									/>
								</figure>
								<div
									className="card-content-info "
									style={{
										display: "flex",
										flexDirection: "row",
										justifyContent: "space-between",
									}}
								>
									<h5>{partner.name}</h5>
									<ul className="card-content-lists">
									</ul>
									<div className="card-content-arrow d-flex" style={{ paddingRight: '18px', width: '12px' }}>
										<img src="/assets/images/icons/card-content-arrow.svg" alt="" style={{
											width: '12px',
											height: '12px'
										}} />
									</div>
								</div>
							</div>
						</a>
					))}
				</div>
			</div>
		</div>
	)
}
