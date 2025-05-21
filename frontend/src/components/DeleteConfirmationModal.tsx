import React, { useState } from 'react'
import styled from 'styled-components'
import { CartItem, DeleteCartParams } from '../types/cart'
import { removeCartItem } from '../api/cart'
import CustomButton from '../ui/CustomButton'
import ErrorDisplay from '../ui/ErrorDisplay'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
`

const Modal = styled.div`
  background: #fff;
  border-radius: 0;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
  width: 420px;
  height: 280px;
  max-width: 90vw;
  margin-top: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #222;
  position: absolute;
  top: 15%;
  left: 10%;
  width: 80%;
  text-align: left;
  margin: 0;
`

const Subtext = styled.p`
  font-size: 1rem;
  color: #555;
  width: 80%;
  margin: 0;
  margin-top: 80px; /* Pushes subtext below the title */
  text-align: left;
`

const Actions = styled.div`
  display: flex;
  gap: 18px;
  position: absolute;
  bottom: 28px;
  left: 0;
  width: 100%;
  justify-content: center;
`

type DeleteConfirmationModalProps = {
  showDeleteModal: boolean
  editCartItem?: CartItem
  cartId: number
  onClose: () => void
}

const DeleteConfirmationModal = ({
  cartId,
  showDeleteModal,
  editCartItem,
  onClose,
}: DeleteConfirmationModalProps) => {
  const [editItem] = useState<CartItem | undefined>(editCartItem)
  const [error, setError] = useState<string>('')

  const handleDelete = async () => {
    try {
      if (!editItem) {
        throw new Error('cartItem is null')
      }

      const params: DeleteCartParams = {
        cartId: cartId,
        cartItemId: editItem.cartItemId ?? 0,
      }

      const result = await removeCartItem(params)

      if (result) {
        onClose()
      }
    } catch (e) {
      console.error('CartItemModal handleSubmit error: ' + JSON.stringify(e))
      setError('An error occurred adding the Cart Item.')
    }
  }

  if (!showDeleteModal) return null

  return (
    <Overlay>
      <Modal>
        <Title>Delete Item?</Title>
        <Subtext>
          Are you sure you want to delete this item? This cannot be undone.
        </Subtext>
        {error && <ErrorDisplay text={error} />}
        <Actions>
          <CustomButton isCancel={true} onClick={onClose} text="Cancel" />
          <CustomButton isSubmit={false} onClick={handleDelete} text="Delete" />
        </Actions>
      </Modal>
    </Overlay>
  )
}

export default DeleteConfirmationModal
