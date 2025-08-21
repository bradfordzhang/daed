import { ActionIcon, Modal, TextInput, Button, Group } from '@mantine/core'
import { IconEdit } from '@tabler/icons-react'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { useTranslation } from 'react-i18next'

import { useUpdateSubscriptionLinkMutation } from '~/apis'

export const UpdateSubscriptionLinkAction = ({ id, currentLink }: { id: string; currentLink: string }) => {
  const { t } = useTranslation()
  const [opened, { open, close }] = useDisclosure(false)
  const updateSubscriptionLinkMutation = useUpdateSubscriptionLinkMutation()

  const form = useForm({
    initialValues: {
      link: currentLink,
    },
    validate: {
      link: (value) => (value.trim() ? null : t('link') + ' ' + t('actions.submit').toLowerCase()),
    },
  })

  const handleSubmit = form.onSubmit((values) => {
    updateSubscriptionLinkMutation.mutate(
      { id, link: values.link },
      {
        onSuccess: () => {
          close()
          form.reset()
        },
      },
    )
  })

  return (
    <>
      <ActionIcon size="xs" onClick={open} title={t('actions.update link')}>
        <IconEdit />
      </ActionIcon>

      <Modal opened={opened} onClose={close} title={t('subscriptionLinkModal.title')}>
        <form onSubmit={handleSubmit}>
          <TextInput
            label={t('subscriptionLinkModal.linkLabel')}
            placeholder={t('subscriptionLinkModal.linkPlaceholder')}
            required
            {...form.getInputProps('link')}
          />

          <Group position="right" mt="md">
            <Button variant="default" onClick={close}>
              {t('subscriptionLinkModal.cancelButton')}
            </Button>
            <Button type="submit" loading={updateSubscriptionLinkMutation.isLoading}>
              {t('subscriptionLinkModal.updateButton')}
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  )
}
