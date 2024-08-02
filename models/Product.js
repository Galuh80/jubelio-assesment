const sql = require('../configurations/Database');
const Pagination = require('../helpers/Pagination');

class Product {
    
    static async getAll(page = 1, pageSize = 10) {
        const pagination = new Pagination(page, pageSize);
        const offset = pagination.getOffset();
        const limit = pagination.getLimit();

        const products = await sql`
            SELECT * FROM products
            ORDER BY id
            LIMIT ${limit}
            OFFSET ${offset}
        `;

        const totalCountResult = await sql`
            SELECT COUNT(*) AS count FROM products
        `;
        const totalCount = totalCountResult[0].count;

        const productDetailsPromises = products.map(product => this.getProductDetails(product.id));
        const productDetails = await Promise.all(productDetailsPromises);

        return {
            data: productDetails,
            meta: {
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page,
                perPage: limit
            }
        };
    }

    static async getProductDetails(productId) {
        const product = await sql`
            SELECT * FROM products
            WHERE id = ${productId}
        `;

        if (product.length === 0) return null;

        const productData = product[0];

        const tags = await this.getTags(productId);
        const reviews = await this.getReviews(productId);
        const dimensions = await this.getDimensions(productId);
        const meta = await this.getMeta(productId);
        const images = await this.getImages(productId);
        
        return {
            id: productData.id,
            title: productData.title,
            description: productData.description,
            category: productData.category,
            price: productData.price,
            discountPercentage: productData.discount_percentage,
            rating: productData.rating,
            stock: productData.stock,
            tags,
            brand: productData.brand,
            sku: productData.sku,
            weight: productData.weight,
            dimensions,
            warrantyInformation: productData.warranty_information,
            shippingInformation: productData.shipping_information,
            availabilityStatus: productData.availability_status,
            reviews,
            returnPolicy: productData.return_policy,
            minimumOrderQuantity: productData.minimum_order_quantity,
            meta,
            images,
            thumbnail: productData.thumbnail
        };
    }

    static async getTags(productId) {
        const tags = await sql`
            SELECT tag FROM tags
            WHERE product_id = ${productId}
        `;
        return tags.map(row => row.tag);
    }

    static async getReviews(productId) {
        const reviews = await sql`
            SELECT rating, comment, date, reviewer_name, reviewer_email FROM reviews
            WHERE product_id = ${productId}
        `;
        return reviews.map(row => ({
            rating: row.rating,
            comment: row.comment,
            date: row.date,
            reviewerName: row.reviewer_name,
            reviewerEmail: row.reviewer_email
        }));
    }

    static async getDimensions(productId) {
        const dimensions = await sql`
            SELECT width, height, depth FROM dimensions
            WHERE product_id = ${productId}
        `;
        if (dimensions.length === 0) return null;
        const dim = dimensions[0];
        return {
            width: dim.width,
            height: dim.height,
            depth: dim.depth
        };
    }

    static async getMeta(productId) {
        const meta = await sql`
            SELECT barcode, qr_code, created_at, updated_at FROM metas
            WHERE product_id = ${productId}
        `;
        if (meta.length === 0) return null;
        const m = meta[0];
        return {
            createdAt: m.created_at,
            updatedAt: m.updated_at,
            barcode: m.barcode,
            qrCode: m.qr_code
        };
    }

    static async getImages(productId) {
        const images = await sql`
            SELECT url FROM images
            WHERE product_id = ${productId}
        `;
        return images.map(row => row.url);
    }

    static async create(data) {
        const { title, sku, image, price, stock } = data;
        
        try {
            await sql.begin(async (trx) => {
                const [product] = await trx`
                    INSERT INTO products (title, sku, price, stock)
                    VALUES (${title}, ${sku}, ${price}, ${stock})
                    RETURNING *
                `;

                await trx`
                    INSERT INTO images (product_id, url)
                    VALUES (${product.id}, ${image})
                `;
                
                return product;
            });
        } catch (err) {
            throw new Error('Transaction failed: ' + err.message);
        }
    }

    static async update(id, data) {
        const { title, sku, image, price, stock } = data;
        
        try {
            const updatedProduct = await sql.begin(async (trx) => {
                const [product] = await trx`
                    UPDATE products
                    SET title = ${title}, sku = ${sku}, price = ${price}, stock = ${stock}
                    WHERE id = ${id}
                    RETURNING *
                `;

                if (!product) {
                    throw new Error('Product not found');
                }

                await trx`
                    UPDATE images
                    SET url = ${image}
                    WHERE product_id = ${id}
                `;
                
                return product;
            });

            return updatedProduct;
        } catch (err) {
            throw new Error('Transaction failed: ' + err.message);
        }
    }

    static async delete(id) {
        try {
            const result = await sql.begin(async (trx) => {
                await trx`
                    DELETE FROM images
                    WHERE product_id = ${id}
                `;

                const [product] = await trx`
                    DELETE FROM products
                    WHERE id = ${id}
                    RETURNING *
                `;

                return product;
            });

            return result;
        } catch (err) {
            throw new Error('Transaction failed: ' + err.message);
        }
    }
}

module.exports = Product;
