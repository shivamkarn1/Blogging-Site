import { toast } from 'sonner'

// Custom toast styles matching your UI
const toastStyles = {
  success: {
    style: {
      background: 'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)',
      color: 'white',
      border: '2px solid #fb923c',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '600',
      padding: '12px 16px',
      boxShadow: '0 10px 25px -5px rgba(249, 115, 22, 0.3), 0 4px 6px -2px rgba(249, 115, 22, 0.1)',
    },
    duration: 4000,
  },
  error: {
    style: {
      background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
      color: 'white',
      border: '2px solid #f87171',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '600',
      padding: '12px 16px',
      boxShadow: '0 10px 25px -5px rgba(220, 38, 38, 0.3), 0 4px 6px -2px rgba(220, 38, 38, 0.1)',
    },
    duration: 5000,
  },
  loading: {
    style: {
      background: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
      color: 'white',
      border: '2px solid #94a3b8',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '600',
      padding: '12px 16px',
      boxShadow: '0 10px 25px -5px rgba(100, 116, 139, 0.3), 0 4px 6px -2px rgba(100, 116, 139, 0.1)',
    },
  }
}

// Custom toast functions
export const showSuccessToast = (message) => {
  return toast.success(message, toastStyles.success)
}

export const showErrorToast = (message) => {
  return toast.error(message, toastStyles.error)
}

export const showLoadingToast = (message) => {
  return toast.loading(message, toastStyles.loading)
}

export const dismissToast = (toastId) => {
  toast.dismiss(toastId)
}