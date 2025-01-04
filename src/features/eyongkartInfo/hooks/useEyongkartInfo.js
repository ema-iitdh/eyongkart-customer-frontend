import { eyongkartInfoService } from '@/api/services/eyongkartInfo.service';
import { useQuery, useMutation } from '@tanstack/react-query';

export const useEyongkartInfo = () => {
  return useQuery({
    queryKey: ['eyongkartInfo'],
    queryFn: eyongkartInfoService.getEyongkartInfo,
  });
};

export const useUpdateEyongkartInfo = () => {
  return useMutation({
    // two params: eyongkartInfoId, data
    mutationFn: eyongkartInfoService.updateEyongkartInfo,
  });
};
