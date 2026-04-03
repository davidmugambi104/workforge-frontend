import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '@components/ui/Modal';
import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';
import { Textarea } from '@components/ui/Textarea';
import { useWorkerProfile, useUpdateWorkerProfile } from '@hooks/useWorker';
import { WorkerUpdateRequest } from '@types';

const editProfileSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  bio: z.string().optional(),
  phone: z.string().min(10, 'Please enter a valid phone number').optional(),
  daily_rate: z.number().min(0, 'Daily wage must be positive').optional(),
  address: z.string().optional(),
});

type EditProfileFormData = z.infer<typeof editProfileSchema>;

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { data: worker } = useWorkerProfile();
  const updateProfile = useUpdateWorkerProfile();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      full_name: worker?.full_name || '',
      bio: worker?.bio || '',
      phone: worker?.phone || '',
      daily_rate: worker?.daily_rate ?? worker?.hourly_rate,
      address: worker?.address || '',
    },
  });

  React.useEffect(() => {
    if (worker) {
      reset({
        full_name: worker.full_name || '',
        bio: worker.bio || '',
        phone: worker.phone || '',
        daily_rate: worker.daily_rate ?? worker.hourly_rate,
        address: worker.address || '',
      });
    }
  }, [worker, reset]);

  const onSubmit = async (data: EditProfileFormData) => {
    await updateProfile.mutateAsync(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <Modal.Header onClose={onClose} showCloseButton>
        Edit Profile
      </Modal.Header>
      <Modal.Body>
        <div className="mb-5 rounded-2xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm font-semibold text-[#1A1A1A]">Make your profile easier to hire</p>
          <p className="mt-1 text-sm text-gray-600">Clear contact details, rate, location, and a short skills-focused bio help employers trust you faster.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            {...register('full_name')}
            label="Full Name"
            placeholder="e.g. David Mugambi"
            error={errors.full_name?.message}
            hint="Use the same name you want employers to see."
            required
          />

          <Textarea
            {...register('bio')}
            label="Bio"
            placeholder="Describe your trade, experience, certifications, and the kind of work you do best."
            rows={4}
            error={errors.bio?.message}
            hint="Short, specific bios perform better than vague descriptions."
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Input
              {...register('phone')}
              label="Phone Number"
              placeholder="e.g. +254 700 000 000"
              error={errors.phone?.message}
              hint="Use the number clients can actually reach."
            />

            <Input
              {...register('daily_rate', { valueAsNumber: true })}
              type="number"
              label="Daily Wage (KES)"
              placeholder="25.00"
              error={errors.daily_rate?.message}
              hint="Set a realistic market rate for your trade."
              leftIcon={<span className="text-gray-500">KES</span>}
            />
          </div>

          <Input
            {...register('address')}
            label="Location"
            placeholder="e.g. Nairobi, Kasarani"
            error={errors.address?.message}
            hint="A specific location helps with nearby job matching."
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              isLoading={updateProfile.isPending}
              disabled={!isDirty}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};