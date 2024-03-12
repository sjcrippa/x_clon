'use client'

import React, { useRef } from 'react'

import { ComposePostBtn } from '../common/compose-post-btn'
import { addPost } from '@/app/actions/add-post-action'

export function ComposePost ({
  userAvatarUrl
}: {
  userAvatarUrl: string
}) {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await addPost(formData)
        formRef.current?.reset()
      }}
      className='flex flex-row p-4 border-b border-white/20'>
      <img
        className='rounded-full w-10 h-10 mr-4'
        alt='avatar image'
        src={userAvatarUrl}
      />
      <div className='flex flex-1 flex-col gap-y-4'>
        <textarea
          name="content"
          rows={4}
          className='w-full text-xl bg-black placeholder-gray-500 p-2 resize-none border-none outline-none'
          placeholder='¿Que esta pasando?'
        ></textarea>
        <ComposePostBtn />
      </div>
    </form>
  )
}
