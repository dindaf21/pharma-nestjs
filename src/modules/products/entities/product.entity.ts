import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImagesEntity } from './product-images.entity';
import { CategoryEntity } from 'src/modules/categories/entities/category.entity';
import { BaseEntity } from 'src/config/common/BaseEntity';
import { SupplierEntity } from 'src/modules/suppliers/entities/supplier.entity';
import { InventoryEntity } from 'src/modules/inventories/entities/inventory.entity';
import { TransactionEntity } from 'src/modules/transactions/entities/transaction.entity';

@Entity('products')
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', unique: true })
  name: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'price', type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ name: 'expiry_date', type: 'timestamptz' })
  expiryDate: Date;

  @Column({ name: 'status', type: 'boolean', default: false })
  status: boolean;

  @Column({ name: 'category_id' })
  categoryId: number;

  @Column ({ name: 'supplier_id' })
  supplierId: number

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({
    name: 'category_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_category_id',
  })
  category: CategoryEntity;

  @ManyToOne(() => SupplierEntity)
  @JoinColumn({
    name: 'supplier_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_supplier_id',
  })
  supplier: SupplierEntity;

  @OneToMany(() => ProductImagesEntity, (image) => image.product)
  productImages: ProductImagesEntity[];
  
  @OneToMany(() => InventoryEntity, (inventory) => inventory.product)
  inventories: InventoryEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.product)
  transactions: TransactionEntity[];
}
