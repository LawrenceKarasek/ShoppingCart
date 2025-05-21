import { useState, useEffect } from 'react'
import { AddCartParams, CartItem, EditCartParams } from '../types/cart'
import QuantitySelect from '../ui/QuantitySelect'
import ProductSelect from '../ui/ProductSelect'
import CustomCheckbox from '../ui/CustomCheckBox'
import { addCartItem, updateCartItem } from '../api/cart'
import styled from 'styled-components'
import ArrowButton from '../ui/ArrowButton'
import CustomButton from '../ui/CustomButton'
import ErrorDisplay from '../ui/ErrorDisplay'

interface CartItemModalProps {
  showModal: boolean
  editCartItem?: CartItem
  onClose: () => void
  cartId: number
}

const Container = styled.div`
  min-height: 100vh;
  background: #ededed;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
`

const Card = styled.div`
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  width: 350px;
  max-width: 95vw;
  padding-bottom: 24px;
  margin-top: 24px;
`

const HeaderBar = styled.div`
  background: #fafbfc;
  color: #222;
  font-family: 'Dosis', 'Nunito', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  padding: 16px 20px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const SectionTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #222;
  margin: 24px 20px 4px 20px;
  font-family: 'Dosis', 'Nunito', sans-serif;
`

const SectionSubtitle = styled.div`
  font-size: 0.97rem;
  color: #888;
  margin: 0 20px 16px 20px;
  font-family: 'Dosis', 'Nunito', sans-serif;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0 20px;
`

const TextArea = styled.textarea`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 12px;
  color: #888 !important;
  font-size: 0.97rem !important;
  font-family: 'Dosis', 'Nunito', sans-serif;
  background: #fafbfc;
  resize: vertical;
  outline: none;
  min-height: 60px;
  max-height: 120px;
  transition: border-color 0.2s;
  &:focus {
    border-color: #1976d2;
  }
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin: 24px 20px 0 20px;
`

const CartItemModal = ({
  cartId,
  showModal,
  onClose,
  editCartItem,
}: CartItemModalProps) => {
  const [selectedCartItem, setSelectedCartItem] = useState<CartItem>({
    cartItemId: 0,
  })
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (editCartItem) {
      setSelectedCartItem(editCartItem)
    }
  }, [editCartItem])

  const handleEditCartItem = <K extends keyof CartItem>(
    key: K,
    value: CartItem[K]
  ) => {
    setSelectedCartItem((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault()

      if (!selectedCartItem.product) {
        throw Error('product cannot be null')
      }

      if (!selectedCartItem.quantity) {
        throw Error('quantity must be greater than 0')
      }

      const { cartItemId } = selectedCartItem

      if (cartItemId && cartItemId > 0) {
        const editCartParams: EditCartParams = {
          cartItemId: selectedCartItem.cartItemId ?? 0,
          quantity: selectedCartItem.quantity ?? 0,
          purchased: selectedCartItem.purchased ?? false,
        }
        const result = await updateCartItem(editCartParams)
        if (result) {
          onClose()
        }
      } else {
        const addCartParams: AddCartParams = {
          cartId: cartId,
          productId: selectedCartItem.product?.id ?? 0,
          quantity: selectedCartItem.quantity ?? 0,
        }
        const result = await addCartItem(addCartParams)
        if (result) {
          onClose()
        }
      }
    } catch (e) {
      console.error('CartItemModal handleSubmit error: ' + JSON.stringify(e))
      setError('An error occurred adding the Cart Item.')
    }
  }

  if (!showModal) return null

  const cartItemEditing: boolean =
    selectedCartItem?.cartItemId && selectedCartItem.cartItemId > 0
      ? true
      : false
  const subText = cartItemEditing
    ? 'Edit your item below'
    : 'Add your new item below'

  return (
    <Container>
      <Card>
        <HeaderBar>
          SHOPPING LIST
          <ArrowButton onClick={onClose} />
        </HeaderBar>
        {error && <ErrorDisplay text={error} />}
        <SectionTitle>
          {`${cartItemEditing ? 'Edit' : 'Add'}`} an item
        </SectionTitle>
        <SectionSubtitle>{subText}</SectionSubtitle>
        <Form onSubmit={handleSubmit}>
          <ProductSelect
            currentProductId={selectedCartItem?.product?.id ?? 0}
            onProductSelect={(product) =>
              handleEditCartItem('product', product)
            }
          />
          <TextArea
            placeholder="Description"
            value={selectedCartItem?.product?.description}
            required
            disabled={true}
            maxLength={100}
          />
          <QuantitySelect
            disabled={false}
            currentQuantity={selectedCartItem.quantity}
            onQuantitySelect={(quantity) =>
              handleEditCartItem('quantity', quantity)
            }
          />
          {selectedCartItem?.id && (
            <>
              <CustomCheckbox<boolean>
                labelText="Purchased"
                checked={selectedCartItem?.purchased ?? false}
                onCheckboxSelect={(purchasedChecked) =>
                  handleEditCartItem('purchased', purchasedChecked)
                }
                setCheckedValue={!selectedCartItem?.purchased}
              />
            </>
          )}
          <Actions>
            <CustomButton isCancel={true} onClick={onClose} text="Cancel" />
            <CustomButton
              isSubmit={true}
              text={`${selectedCartItem.id ? 'Save' : 'Add'} Item`}
            />
          </Actions>
        </Form>
      </Card>
    </Container>
  )
}

export default CartItemModal
