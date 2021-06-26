interface ReservationInterface {
    id: number;
    item_id: number;
    email: string;
    first_name: string;
    last_name: string;
    created_at: Date;
}

interface ItemInterface {
    name: string;
    id: string;
    description: string;
    url: string;
    price: number;
    public_img_path: string;
    reservation?: ReservationInterface;
}

export default ItemInterface;
