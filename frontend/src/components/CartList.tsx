import { useEffect, useState } from 'react'
import { CartItem } from '../types/cart'
import { getCart } from '../api/cart'
import CartItemModal from './CartItemModal'
import DeleteConfirmationModal from './DeleteConfirmationModal'
import styled from 'styled-components'
import CustomCheckbox from '../ui/CustomCheckBox'
import LoadingIcon from '../ui/LoadingIcon'
import CustomButton from '../ui/CustomButton'
import ErrorDisplay from '../ui/ErrorDisplay'

const PageWrapper = styled.div`
  background: #ededed;
  min-height: 100vh;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Dosis', 'Nunito', sans-serif;
`

const Card = styled.div`
  background: #fff;
  width: 90vw;
  max-width: 700px;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  padding-bottom: 32px;
`

const HeaderBar = styled.div`
  background: #4d81b7 !important;
  color: #fff;
  padding: 16px 24px;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: left;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 24px 16px 24px;
`

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  color: #222;
  margin: 0;
`

const ItemList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0 24px;
`

const ItemRow = styled.li<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  background: ${({ selected }) => (selected ? '#f5faff' : 'transparent')};
  border: 3px solid transparent;
  border: 1px solid #f2f2f2;
  padding: 15px;
  transition:
    background 0.2s,
    border-color 0.2s;
  margin-bottom: 10px;
`

const ItemText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const ItemTitle = styled.span<{ checked?: boolean }>`
  font-weight: 600;
  color: ${({ checked }) => (checked ? '#1976d2' : '#222')};
  font-family: 'Dosis', 'Nunito', sans-serif;
  font-size: 1rem;
  text-decoration: ${({ checked }) => (checked ? 'line-through' : 'none')};
`

const ItemSubtitle = styled.span<{ checked?: boolean }>`
  font-size: 0.94rem;
  color: #888;
  margin-top: 2px;
  font-family: 'Dosis', 'Nunito', sans-serif;
  text-decoration: ${({ checked }) => (checked ? 'line-through' : 'none')};
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const IconButton = styled.button`
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 4px;

  &:hover {
    color: #1976d2;
  }
`

const EmptyStateWrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
`

const EmptyStateBox = styled.div`
  width: 50vw;
  height: 20vw; /* width / height = 2.5 */
  max-width: 500px;
  min-width: 280px;
  min-height: 112px;
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fafbfc;
  border-radius: 0;
`

const EmptyStateText = styled.div`
  font-family: 'Dosis', 'Nunito', sans-serif;
  font-size: 1.15rem;
  color: #888;
  margin-bottom: 24px;
  text-align: center;
`

const CartItems = () => {
  const [cartItems, setCartItems] = useState<CartItem[] | null>(null)
  const [editCartItem, setEditCartItem] = useState<CartItem | undefined>(
    undefined
  )
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [checkedId, setCheckedId] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const CART_ID = 1 //TODO: dynamic from database when there are multiple users with carts

  const fetchCart = async () => {
    setLoading(true)
    try {
      const result = await getCart()
      if (result) {
        setEditCartItem(undefined)
        setCheckedId(0)

        if (result.savedCartItems) {
          setCartItems(result.savedCartItems)
        }
      }
    } catch (e) {
      console.error('fetchCart error: ' + e)
      setError('An error occurred getting the data.')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (cartItem: CartItem) => {
    cartItem.cartItemId = cartItem.id
    setEditCartItem(cartItem)
    setShowModal(true)
  }

  const handleDelete = async (cartItem: CartItem) => {
    cartItem.cartItemId = cartItem.id
    setEditCartItem(cartItem)
    setShowDeleteModal(true)
  }

  useEffect(() => {
    fetchCart()
  }, [])

  const onCloseAdd = async () => {
    setShowModal(false)
    setShowDeleteModal(false)
    fetchCart()
  }

  return (
    <PageWrapper>
      {loading ? (
        <LoadingIcon />
      ) : (
        <>
          {error && <ErrorDisplay text={error} />}
          {showDeleteModal && (
            <DeleteConfirmationModal
              cartId={CART_ID}
              showDeleteModal={showDeleteModal}
              editCartItem={editCartItem}
              onClose={onCloseAdd}
            />
          )}
          {showModal ? (
            <CartItemModal
              cartId={CART_ID}
              showModal={showModal}
              editCartItem={editCartItem}
              onClose={onCloseAdd}
            />
          ) : cartItems && cartItems.length > 0 ? (
            <>
              <Card>
                <HeaderBar>SHOPPING LIST</HeaderBar>
                <SectionHeader>
                  <SectionTitle>Your Items</SectionTitle>
                  <CustomButton
                    isSubmit={false}
                    onClick={() => setShowModal(true)}
                    text="Add Item"
                  />
                </SectionHeader>
                <ItemList>
                  {cartItems.map((cartItem: CartItem) => {
                    const { id, product } = cartItem
                    return (
                      <ItemRow key={id} selected={id === checkedId}>
                        <CustomCheckbox<number>
                          labelText=""
                          checked={id === checkedId}
                          onCheckboxSelect={setCheckedId}
                          setCheckedValue={id ? (checkedId === id ? 0 : id) : 0}
                        />
                        <ItemText>
                          <ItemTitle checked={id === checkedId}>
                            {product?.name}
                          </ItemTitle>
                          <ItemSubtitle checked={id === checkedId}>
                            {product?.description}
                          </ItemSubtitle>
                        </ItemText>
                        <Actions>
                          <IconButton
                            onClick={() => handleEdit(cartItem)}
                            title="Edit"
                          >
                            <span className="material-symbols-outlined">
                              edit
                            </span>
                          </IconButton>
                          <IconButton
                            onClick={() => handleDelete(cartItem)}
                            title="Delete"
                          >
                            <span className="material-symbols-outlined">
                              delete
                            </span>
                          </IconButton>
                        </Actions>
                      </ItemRow>
                    )
                  })}
                </ItemList>
              </Card>
            </>
          ) : (
            <EmptyStateWrapper>
              <EmptyStateBox>
                <EmptyStateText>Your shopping list is empty :(</EmptyStateText>
                <CustomButton
                  isSubmit={false}
                  onClick={() => setShowModal(true)}
                  text="Add your first item"
                />
              </EmptyStateBox>
            </EmptyStateWrapper>
          )}
        </>
      )}
    </PageWrapper>
  )
}

export default CartItems
