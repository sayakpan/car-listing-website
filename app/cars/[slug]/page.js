import { getCarBySlug, formatPrice } from "@/lib/cars-data"
import CarDetailPageClient from "./CarDetailPageClient"

export async function generateMetadata({ params }) {
  const { slug } = await params
  const car = getCarBySlug(slug)

  if (!car) {
    return {
      title: "Car Not Found",
    }
  }

  const title = `${car.brand} ${car.model} ${car.year} - CarHub`
  const description = `${car.description.substring(0, 160)}...`
  const price = formatPrice(car.price)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: car.image,
          alt: `${car.brand} ${car.model}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [car.image],
    },
  }
}

export default async function CarDetailPage({ params }) {
  const { slug } = await params
  return <CarDetailPageClient slug={slug} />
}
